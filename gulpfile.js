var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var path = {
    js: 'src/javascript/*.js',
    mock: 'src/mock/*.json',
    partials: 'src/templates/partials/*.html',
    css:  'src/styles/*.css',
    html: 'src/templates/*.html',
    images: 'src/images/*.*',
    fonts: 'src/fonts/*.ttf',
    vendor: {
      js: 'src/vendor/js/*.js',
      css: 'src/vendor/css/*.css',
    },
    build: {
      js: 'build/javascript/',
      mock: 'build/mock/',
      partials: 'build/partials/',
      css:  'build/styles/',
      images: 'build/images/',
      fonts: 'build/fonts/',
      vendor: {
      js: 'build/vendor/js/',
      css: 'build/vendor/css/',
      },
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

gulp.task('default', ['build', 'serve', 'watch']);

/*Build for me*/
gulp.task('js', function () {
  return gulp.src(path.js)
  .pipe(concat('script.js'))
  .pipe(gulp.dest(path.build.js));
});

gulp.task('partials', function () {
  return gulp.src(path.partials)
    .pipe(gulp.dest(path.build.partials));
});

gulp.task('mock', function () {
  return gulp.src(path.mock)
    .pipe(gulp.dest(path.build.mock));
});

gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.build.html));
});

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer({
      browsers: ['last 4 versions']
  }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('vendor-css', function () {
  return gulp.src(path.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(path.build.vendor.css));
});

gulp.task('vendor-js', function () {
  return gulp.src(path.vendor.js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(path.build.vendor.js));
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
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
  }))
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

gulp.task('build', ['html', 'css', 'vendor-css', 'vendor-js', 'images', 'fonts', 'js', 'mock', 'partials']);
gulp.task('prod', ['htmlProd', 'css-minProd', 'vendor-css-minProd', 'imagesProd']);

gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.images, ['images']);
  gulp.watch(path.vendor.css, ['vendor-css']);
  gulp.watch(path.fonts, ['fonts']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.mock, ['mock']);
  gulp.watch(path.partials, ['partials']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.build.html
    }
  });
  gulp.watch('build/*').on('change', browserSync.reload);
});
