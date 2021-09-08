const {src, dest, watch, series, parallel} = require("gulp");
const browserSync = require('browser-sync').create();
const concat = require("gulp-concat");
const terser = require('gulp-terser');
const imagemin = require("gulp-imagemin");
let resizer = require('gulp-images-resizer');
const webp = require('gulp-webp');
const cssnano = require("gulp-cssnano");

// file paths to all the source files
const srcRoot = "./src";
const srcPaths = {
    html: `${srcRoot}/**/*.html`,
    css: `${srcRoot}/css/**`,
    js: `${srcRoot}/js/**`,
    media: `${srcRoot}/media/**`
};

// paths to all the dest files
const destRoot = "./public";
const destPaths = {
    html: `${destRoot}`,
    css: `${destRoot}/css`,
    js: `${destRoot}/js`,
    media: `${destRoot}/media`
};


/**
 * moves all the html files to the dest folder
 */
const copyHTML = () => {
    return src(srcPaths.html).pipe(dest(destPaths.html));
};


/**
 * concatenates all the CSS files and moves the mega file to the css dest folder
 */
const copyCSS = () => {
    return src(
        srcPaths.css
    ).pipe(
        concat("all.css")
    ).pipe(
        cssnano()
    ).pipe(
        dest(destPaths.css)
    ).pipe(
        browserSync.stream()
    );
};


/**
 * concatenates and minifies all the JS files and moves the to the dest folder and
 * updates the browser.
 */
const copyJS = () => {
    return src(
        srcPaths.js
    ).pipe(
        concat("all.js")
    ).pipe(
        terser()
    ).pipe(
        dest(destPaths.js)
    ).pipe(
        browserSync.stream()
    );
};


/**
 * resizes the images and converts to webp format
 */
const convertWebp = () => {
    return src(
        srcPaths.media
    ).pipe(
        resizer({
            width: 200,
            height: 200
        })
    ).pipe(
        webp()
    ).pipe(
        dest(destPaths.media)
    );
};


/**
 * resizes the images and compresses the images.
 */
const compressMedia = () => {
    return src(
        srcPaths.media
    ).pipe(
        resizer({
            width: 200,
            height: 200
        })
    ).pipe(
        imagemin()
    ).pipe(
        dest(destPaths.media)
    );
}


/**
 * initialises the browserSync and starts all the watchers
 */
const serve = () => {
    browserSync.init({
        server: "./public"
    });

    // using multiple file watcher so only the filed that get changed moves
    watch(srcPaths.html, copyHTML).on("change", browserSync.reload);
    watch(srcPaths.css, copyCSS).on("change", browserSync.reload);
    watch(srcPaths.js, copyJS).on("change", browserSync.reload);
    watch(srcPaths.media, compressMedia).on("change", browserSync.reload);
    watch(srcPaths.media, convertWebp).on("change", browserSync.reload)
};

// runs a series of all copy tasks and then start watching
// the copy tasks runs in parallel since they are not dependant on each other
exports.default = series(
    parallel(copyHTML, copyCSS, copyJS, compressMedia, convertWebp),
    serve
);