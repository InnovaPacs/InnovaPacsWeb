const gulp = require('gulp');
const war = require('gulp-war');
const zip = require('gulp-zip');

gulp.task('war', function (callback) {
    gulp.src(['./dist/innova-pacs-web/**'])
        .pipe(war({
                welcome: 'index.html',
                displayName: 'innova-pacs-web',
        }))
        .pipe(zip('innova-pacs-web.war'))
        .pipe(gulp.dest("./dist"));
        callback();
});
