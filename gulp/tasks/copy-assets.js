import merge from 'merge-stream';

export default function (gulp) {
  gulp.task('copy-assets', () => {
    return merge(
      gulp
      .src('./js/bundle.js')
      .pipe(gulp.dest('./public/js')),

      gulp
      .src('./css/base.css')
      .pipe(gulp.dest('./public/css/')),

      gulp
      .src('./images/bg.png')
      .pipe(gulp.dest('./public/images'))
    );
  });
}
