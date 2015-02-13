import fs from 'fs';
import gulp from 'gulp';
import util from 'gulp-util';
import path from 'path';

gulp.task('default', ['browserify', 'copy-assets']);

let dir = path.resolve(__dirname, 'tasks');
for (let file of fs.readdirSync(dir)) {
  let task = require(path.resolve(dir, file));
  if(task.default) {
    task = task.default;
  }
  if(typeof task !== 'function') {
    util.log(`task ${file} must export a default function`);
  }
  task(gulp);
}
