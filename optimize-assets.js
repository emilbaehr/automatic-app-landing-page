const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIRS = [
    path.join(__dirname, 'assets'),
    path.join(__dirname, 'assets', 'screenshot')
];

const DEVICE_FRAMES = ['black.png', 'white.png', 'blue.png', 'yellow.png', 'coral.png']; // Adjust as needed

async function optimizeFolder(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        // Only process files, skip directories if they are caught (we process exact dirs based on array)
        if (stat.isFile()) {
            const ext = path.extname(file).toLowerCase();
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const isDeviceFrame = DEVICE_FRAMES.includes(file.toLowerCase());
                const webpPath = filePath.replace(new RegExp(ext + '$', 'i'), '.webp');

                console.log(`Optimizing: ${file} -> ${path.basename(webpPath)}`);

                try {
                    // Sharp options (lossless for simple ui frames, high fidelity lossy for screenshots/icons)
                    const options = isDeviceFrame
                        ? { lossless: true, effort: 6 }
                        : { quality: 90, effort: 6, smartSubsample: true };

                    await sharp(filePath)
                        .webp(options)
                        .toFile(webpPath);

                    console.log(`Success, removing original: ${file}`);
                    fs.unlinkSync(filePath);
                } catch (error) {
                    console.error(`Error processing ${file}:`, error);
                }
            }
        }
    }
}

async function main() {
    console.log('Starting optimization of assets...');
    for (const dir of ASSETS_DIRS) {
        await optimizeFolder(dir);
    }
    console.log('Optimization complete!');
}

main();
