# miun-web3-mom2

## Why automate?
* When the project is ready for publishing everything in the destination folder is moved to the production server.
* By automating these tasks the development environment will reflect exactly what files will be on the production server.
* Cuts down on manual tasks such as compiling sass or similar.
* With live reloading all the changes are reflected immediately on the browser which makes it a more pleasant development experience.

# Packages used
* gulp - the base for all the other packages.
* browser-sync - a live reload server to cut down on manual refreshes.
* gulp-concat - concatenates JS and CSS to reduce download time.
* gulp-cssnano - minifies CSS to reduce download time.
* gulp-imagemin - compresses jpeg to reduce download time.
* gulp-image-resize - resizes source images to wanted size so not too large images are sent thus reducing download time.
* gulp-terser - minifies JS to reduce download time.
* gulp-webp - converts images to a better compressed format to reduce download time if the users browser supports the format.

## How to run it
1. Make sure to have node and npm installed and on PATH
2. Install [gulp cli](https://gulpjs.com/docs/en/getting-started/quick-start/) with `npm install --g gulp-cli`.\
This will require superuser privileges.
3. Navigate to `miun-web3-mom2` and run `npm install` in terminal.
4. Run `gulp` in terminal.
