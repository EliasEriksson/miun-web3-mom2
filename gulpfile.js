const {src, dest, watch, series, parallel} = require("gulp");
const browserSync = require('browser-sync').create();
const concat = require("gulp-concat");
const terser = require('gulp-terser');
const imagemin = require("gulp-imagemin");
const resize = require("gulp-image-resize");
const webp = require('gulp-webp');

const srcRoot = "./src";
const srcPaths = {
    html: `${srcRoot}/**/*.html`,
    css: `${srcRoot}/css/**`,
    js: `${srcRoot}/js/**`,
    media: `${srcRoot}/media/**`
};

const destRoot = "./public";
const destPaths = {
    html: `${destRoot}`,
    css: `${destRoot}/css`,
    js: `${destRoot}/js`,
    media: `${destRoot}/media`
};

const copyHTML = () => {
    return src(srcPaths.html).pipe(dest(destPaths.html));
};

const copyCSS = () => {
    return src(
        srcPaths.css
    ).pipe(
        concat("all.css")
    ).pipe(
        dest(destPaths.css)
    ).pipe(
        browserSync.stream()
    );
};

const copyJS = () => {
    return src(
        srcPaths.js
    ).pipe(
        concat("all.js")
    ).pipe(
        terser()
    ).pipe(
        dest(destPaths.js)
    ).pipe(browserSync.stream());
};

const copyMedia = () => {
    return src(
        srcPaths.media
    ).pipe(
        imagemin()
    ).pipe(
        resize({
            width: 200,
            height: 200,
            crop: true,
            upscale: false
        })
    ).pipe(
        webp()
    ).pipe(dest(destPaths.media));
};

const serve = () => {
    browserSync.init({
        server: "./public"
    });

    // using multiple file watcher so only the filed that get changed moves
    watch(srcPaths.html, copyHTML).on("change", browserSync.reload);
    watch(srcPaths.css, copyCSS).on("change", browserSync.reload);
    watch(srcPaths.js, copyJS).on("change", browserSync.reload);
    watch(srcPaths.media, copyMedia).on("change", browserSync.reload);
};

exports.default = series(
    parallel(copyHTML, copyCSS, copyJS, copyMedia),
    serve
);