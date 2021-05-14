const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const webp = require("gulp-webp");
const htmlmin = require("gulp-htmlmin");
const minify = require("gulp-minify");
//const svgstore = require("svgstore");
const clean = require("gulp-clean");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => { /**В демке по-другому прописан сервер 1:52:13*/
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/js/javascript.js", gulp.series(minjs));
  gulp.watch("source/*.html", gulp.series(htmlmin, sync.reload));
}

exports.watcher = watcher;

//Images

const copyimg = () => {
  return gulp.src("source/img/**/*.*")
    .pipe(gulp.dest("build/img"))
}
exports.copyimg = copyimg;

const imagesopti = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.imagesopti = imagesopti;

const createwebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.createwebp = createwebp;

//HTML

const minhtml = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
}

exports.minhtml = minhtml;

//JavaScript

const minjs = () => {
  return gulp.src("source/js/scripts.js")
    .pipe(minify())
    .pipe(rename("scripts.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream())
}

exports.minjs = minjs;

//Sprite
/*Выдает ошибку*/ /*
const sprite = () => {  /*
  return gulp.src("source/img/logo-icon/logo-sprite/*.svg")
    .pipe(svgstore({inLineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;
*/
//Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/*.webmanifest"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

const cleanbuild = () => {
  return gulp.src("./build", {read: false})
    .pipe(clean())
};

exports.cleanbuild = cleanbuild;

exports.default = gulp.series(
  cleanbuild,
  copyimg,
  gulp.parallel(
    copy,
    minhtml,
    styles,
    minjs,
    createwebp
  ),
  gulp.series(
    server,
    watcher
  )
); /*sprite,*/

const build = gulp.series(
  cleanbuild,
  imagesopti,
  gulp.parallel(
    copy,
    minhtml,
    styles,
    minjs,
    createwebp
  ),
  gulp.series(
    server,
    watcher
  )
); /*sprite,*/

exports.build = build;
