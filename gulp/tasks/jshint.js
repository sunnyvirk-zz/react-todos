import jshint from 'gulp-jshint';
import jshintStylish from 'jshint-stylish';

export default function(gulp) {
    gulp.task('jshint', function() {
        return gulp
            .src([
                '**/*.js',
                '!./js/bundle.js',
                '!node_modules/**/*.js'
            ])
            .pipe(jshint({defaultFile: '.jshintrc', jsx: true}))
            .pipe(jshint.reporter(jshintStylish));
    });
}
