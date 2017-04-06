var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var sass = require('gulp-sass'); //require the sass processor

//notice the import of the new plugins
var nodemon = require('nodemon');
var livereload = require('gulp-livereload');


gulp.task('js', function() {
    gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(minify())
        .pipe(gulp.dest('www/scripts'));
});

//new sass task
gulp.task('sass', function() {
    gulp.src('styles/*.scss')
        .pipe(sass()) //notice how we pass our .scss files through our sass processor
        .pipe(gulp.dest('www/styles'))
})

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['js']);
    gulp.watch('styles/*.scss', ['sass']);
});

//refresh task - refreshes the browser
gulp.task('refresh', function() {

    livereload.reload();
});

//server task - responsilbe for running our express server
gulp.task('server', function() {

    livereload.listen(); //start listening for changes 

    nodemon({
        'script': 'server.js',
        //nodemon should only restart the server when `server.js` changes so we ignore the rest:
        'ignore': ['index.html', 'package.json', 'gulpfile.js', 'src/scripts/*.js', 'www']
    }).on('restart', function() {
        livereload.reload(); //on server restart, refresh the browser
    })
});

gulp.task('start', ['server', 'watch']);
