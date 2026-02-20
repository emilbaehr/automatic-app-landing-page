const gplay = require('google-play-scraper').default || require('google-play-scraper');
const fs = require('fs');
const yaml = require('js-yaml');
const download = require('download');
const path = require('path');
const sharp = require('sharp');

// --- Configuration ---
const CONFIG_FILE = '_config.yml';
const ASSETS_DIR = 'assets';
const ICON_FILENAME = 'appicon.webp';
const SCREENSHOT_DIR = path.join(ASSETS_DIR, 'screenshot');

// Sharp settings: high fidelity for UI screenshots
const WEBP_OPTIONS = { quality: 90, effort: 6, smartSubsample: true };

// --- Helper Functions ---

/**
 * Downloads a URL, converts the buffer to WebP via sharp,
 * and saves it directly as a .webp file.
 */
async function downloadAsWebp(url, outputPath) {
    try {
        const buffer = await download(url);
        await sharp(buffer)
            .webp(WEBP_OPTIONS)
            .toFile(outputPath);
        console.log(`✅ Saved (WebP): ${outputPath}`);
        return buffer; // Return raw buffer for metadata inspection if needed
    } catch (e) {
        console.error(`⚠️ Failed to process ${url}: ${e.message}`);
        return null;
    }
}

async function main() {
    const appId = process.argv[2];

    if (!appId) {
        console.error("❌ Usage: node fetch-app-data.js <com.package.name>");
        process.exit(1);
    }

    console.log(`🔍 Fetching data for: ${appId} from Google Play...`);

    try {
        const appData = await gplay.app({ appId: appId, lang: 'es', country: 'mx' });

        console.log(`📱 Found app: ${appData.title}`);

        // 1. Download Icon → WebP
        if (appData.icon) {
            const iconPath = path.join(ASSETS_DIR, ICON_FILENAME);
            const result = await downloadAsWebp(appData.icon, iconPath);

            if (result) {
                // 3. Generate favicon.ico from the same WebP icon
                const faviconPath = path.join('.', 'favicon.ico');
                fs.copyFileSync(iconPath, faviconPath);
                console.log(`✅ Favicon generated: ${faviconPath} (copied from ${iconPath})`);
            }
        }

        // 2. Download Screenshots (Up to 5, portrait only) → WebP
        if (appData.screenshots && appData.screenshots.length > 0) {
            // Clear screenshot dir first to avoid clutter
            if (fs.existsSync(SCREENSHOT_DIR)) {
                fs.rmSync(SCREENSHOT_DIR, { recursive: true, force: true });
            }
            fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

            const limit = 5;
            let savedCount = 0;

            console.log("🖼️ Processing screenshots (filtering for portrait, converting to WebP)...");

            for (let i = 0; i < appData.screenshots.length && savedCount < limit; i++) {
                const screenUrl = appData.screenshots[i];

                try {
                    // Download raw buffer to inspect dimensions before saving
                    const buffer = await download(screenUrl);
                    const metadata = await sharp(buffer).metadata();

                    if (metadata.height > metadata.width) {
                        // Portrait — convert to WebP and save
                        const finalPath = path.join(SCREENSHOT_DIR, `screen${savedCount + 1}.webp`);
                        await sharp(buffer)
                            .webp(WEBP_OPTIONS)
                            .toFile(finalPath);
                        console.log(`✅ Kept portrait screenshot: screen${savedCount + 1}.webp (${metadata.width}x${metadata.height})`);
                        savedCount++;
                    } else {
                        // Landscape/Square — Discard
                        console.log(`🗑️ Discarded non-portrait screenshot (${metadata.width}x${metadata.height})`);
                    }

                } catch (err) {
                    console.error(`⚠️ Error processing screenshot ${i}: ${err.message}`);
                }
            }

            if (savedCount === 0) {
                console.log("⚠️ No valid portrait screenshots found. You may need to upload one manually.");
            }
        }

        // 4. Update Config
        await updateConfig(appData);

        console.log("\n🎉 Done! Now run 'bundle exec jekyll serve' to review changes.");

    } catch (e) {
        console.error(`❌ Error fetching app data: ${e.message}`);
        if (e.message.includes('App not found')) {
            console.log("💡 Tip: Double check the package name and ensure the app is available in the selected store.");
        }
    }
}

async function updateConfig(appData) {
    try {
        let fileContent = fs.readFileSync(CONFIG_FILE, 'utf8');

        console.log("📝 Updating _config.yml...");

        const replacements = [
            { key: 'app_name', value: appData.title },
            { key: 'app_description', value: appData.summary },
            { key: 'playstore_link', value: appData.url },
            { key: 'app_price', value: appData.free ? 'Gratis' : (appData.priceText || appData.price) },
            { key: 'app_icon', value: `assets/${ICON_FILENAME}` },
            { key: 'developer_name', value: appData.developer },
            { key: 'your_name', value: appData.developer },
            { key: 'page_title', value: appData.title },
            // Add localized fields
            { key: 'changelog_title', value: "Novedades" },
            { key: 'latest_changes', value: appData.recentChanges || "" }
        ];

        let specificReplacementsMade = false;

        for (const item of replacements) {
            const regex = new RegExp(`^${item.key}\\s*:.*$`, 'm');
            if (regex.test(fileContent)) {
                const safeValue = JSON.stringify(item.value);
                fileContent = fileContent.replace(regex, `${item.key.padEnd(38)}: ${item.value}`);
                specificReplacementsMade = true;
            } else if (item.key === 'changelog_title' || item.key === 'latest_changes') {
                // If key doesn't exist, append it (only for new optional fields)
                fileContent += `\n${item.key.padEnd(38)}: ${item.value}`;
                console.log(`➕ Added new key: ${item.key}`);
            }
        }

        fs.writeFileSync(CONFIG_FILE, fileContent, 'utf8');
        console.log(`✅ Updated ${CONFIG_FILE} successfully.`);

    } catch (e) {
        console.error(`❌ Error updating config: ${e.message}`);
    }
}

main();
