# Automatic App Landing Page
**Create and deploy an iOS app landing page on GitHub Pages in only five minutes.**

Designed for GitHub Pages for super easy set up. 

🔧 Fork this repo

🗝 Enter iOS App ID in `_config.yml`

📲 Upload video preview or screenshot

🎨 Customise site in `_config.yml` (no HTML/CSS)

📝 Write Privacy Policy as markdown in `privacypolicy.md`

🕒 Keep a changelog in `CHANGELOG.md`

✅ Site becomes live at GitHub Pages repository URL, e.g. `https://your-username.github.io/your-repo-name/`.

<img src="https://emilbaehr.com/files/jayson1.png" width="440"> <img src="https://emilbaehr.com/files/slor1.png" width="440">




## Quick Start

### Step 1: Fork this repo.
After forking the repo, your site will be live immediately on your personal Github Pages account, e.g. `https://yourusername.github.io/your-repo-name/`.

*Make sure GitHub Pages is enabled for your repo. It might take some time for the site to propagate entirely.*



### Step 2: Enter iOS App ID in `_config.yml`
Enter your iOS app ID in the `ios_app_id` field and commit your changes. Your site will automatically rebuild with your app icon, name, price and link to App Store.

You can go on with customising almost anything in the `_config.yml` file. 

Things you can customise in `_config.yml`:
- App Name
- App Icon
- App Description
- App Price
- App Store Link
- Play Store Link
- Press Kit Download Link
- Cover Image
- Cover Overlay Color
- Background Color
- Text Colors
- iPhone Device Color
- Your Name / Company Name
- Link to Website
- Social Links and Contact Info
- Feature List (Title, text, icon)



### Step 3: Add screenshot or video

#### Adding a screenshot
Upload a `.png` or `.jpg` of your app to the folder `assets/screenshot/`. The name does not matter. Be sure to delete the placeholder `yourscreenshot.png`.

#### Adding video
Upload your video to the folder `assets/videos/`. To have support for most browsers, you need to upload two files – one for Safari and one for Chrome/Firefox.

Video formats supported by Chrome and Firefox:
- `.webm`
- `.ogg`

Video formats supported by Safari:
- `.mp4`
- `.mov`

#### Resolutions
The videos and screenshots must have one of the following resolutions:
- 828x1792
- 1125x2436
- 1242x2688



### Step 4: Edit (or remove) Privacy Policy and Changelog
Your site automatically includes pages for a Privacy Policy and a Changelog. Change the content of these pages by editing the `privacypolicy.md` and `CHANGELOG.md` files in the `_pages` directory.

In each of the markdown files, you can set the `include_in_header:` value to either `true` or `false`. This determines if the page is included in the top navigation.
By default, only the Changelog is included in the top navigation. The title of the navigation item can also be edited, by editing the `title:` in each markdown file.

If you need to, you can create additional markdown based pages just by creating an `.md` file like the `privacypolicy.md` and `CHANGELOG.md` files in the `_pages` directory.

**Please note:** The Privacy Policy and Changelog provided are written using dummy text, so please adapt each of them for your own app.
You can also choose not to include these pages, by simple deleting the `privacypolicy.md` and `CHANGELOG.md` files.




## Feedback
If you have feedback regarding bugs or improvements, open an issue, @ me on Twitter or write me an email. You can find my contact info on my website.

I'd love to see the sites you create using this little tool.

## Credits
- [Jekyll](https://github.com/jekyll/jekyll)
- [FontAwesome](https://fontawesome.github.io/Font-Awesome/)

## Donations
[Donations are welcome](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=S8ZZT3JXJPN92&currency_code=USD&source=url)

## Author
[Emil Baehr](https://emilbaehr.com/)

## License
[MIT License](LICENSE)
