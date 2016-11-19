var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var browserSync = require('browser-sync').create();

var path = {
    css:  'src/styles/*.css',
    html: 'src/templates/*.html',
    images: 'src/images/*.*',
    fonts: 'src/fonts/*.ttf',
    dist: {
      css:  'dist/styles/',
      images: 'dist/images/',
      fonts: 'dist/fonts/',
      html: 'dist/'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('images', function(){
  return gulp.src(path.images)
  .pipe(gulp.dest(path.dist.images));
});

gulp.task('fonts', function(){
  return gulp.src(path.fonts)
  .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('build', ['html', 'css', 'images', 'fonts']);

gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.images, ['images']);
  gulp.watch(path.fonts, ['fonts']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
