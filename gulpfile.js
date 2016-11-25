var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync').create();

var path = {
    css:  'src/styles/*.css',
    html: 'src/templates/*.html',
    images: 'src/images/*.*',
    fonts: 'src/fonts/*.ttf',
    vendor: {
      css: 'src/vendor/css/*.css',
    },
    build: {
      css:  'build/styles/',
      images: 'build/images/',
      fonts: 'build/fonts/',
      vendor: 'build/vendor/',
      html: 'build/',
    },
    prod: {
      css_min: 'production/styles_min/',
      css:  'production/styles/',
      images: 'production/images/',
      fonts: 'production/fonts/',
      vendor: 'production/vendor/',
      html: 'production/',
    }
};

gulp.task('default', ['build', 'prod', 'serve', 'watch']);

/*Build for me*/
gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.build.html));
});

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('vendor-css', function () {
  return gulp.src(path.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(path.build.vendor));
});

gulp.task('images', function(){
  return gulp.src(path.images)
  .pipe(gulp.dest(path.build.images));
});

gulp.task('fonts', function(){
  return gulp.src(path.fonts)
  .pipe(gulp.dest(path.build.fonts));
});

/*Production minification*/
gulp.task('htmlProd', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.prod.html));
});

gulp.task('css-minProd', function () {
  return gulp.src(path.css)
    .pipe(concat('styles.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.prod.css));
});

gulp.task('vendor-css-minProd', function () {
  return gulp.src(path.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.prod.vendor));
});

gulp.task('imagesProd', function(){
  return gulp.src(path.images)
  .pipe(gulp.dest(path.prod.images));
});

gulp.task('fontsProd', function(){
  return gulp.src(path.fonts)
  .pipe(gulp.dest(path.prod.fonts));
});

gulp.task('build', ['html', 'css', 'vendor-css', 'images', 'fonts']);
gulp.task('prod', ['htmlProd', 'css-minProd', 'vendor-css-minProd', 'imagesProd', 'fontsProd']);

gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.images, ['images']);
  gulp.watch(path.vendor.css, ['vendor-css']);
  gulp.watch(path.fonts, ['fonts']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.build.html
    }
  })
  gulp.watch('build/**').on('change', browserSync.reload);
});
