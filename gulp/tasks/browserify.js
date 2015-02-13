import browserify from 'browserify';
import to5ify from '6to5ify';
import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import path from 'path';
import source from 'vinyl-source-stream';

function getBundler() {
  return (
    browserify()
    .require("./node_modules/reflux/src/index.js", { expose: 'reflux'})
    .transform(to5ify.configure({runtime: true}))
    .add(
      path.resolve('js/app.js'),
      { entry: true }
    )
  );
}

function update(bundler) {
  bundler
  .transform({
    global: true
  }, 'uglifyify')  
  .bundle()
  .on('error', gulpUtil.log)
  .on('end', function() {
    return gulpUtil.log('Bundle complete');
  })
  .pipe(source('app.js'))
  .pipe(gulp.dest('public/js'));
}

export default function (gulp) {
  gulp.task('browserify', function() {
    return update(getBundler());
  });
}
