/* gulpfile
*
* $ npm install gulp webpack-stream babel-loader babel-preset-es2015 gulp-jshint jshint-stylish gulp-sass gulp-autoprefixer http st --save-dev
*
*/

var gulp = require('gulp'),
	webpack = require('webpack-stream'),
	config = require('./webpack.config.js'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	http = require('http'),
	st = require('st');

/* lint js files */
gulp.task('lint', function() {
	return gulp.src('./app/js/**/*.js')
		.pipe(jshint({ esversion: 6 }))
		.pipe(jshint.reporter('jshint-stylish'));
});

/* bundle js modules with webpack */
gulp.task('webpack', ['lint'], function() {
	return gulp.src('./app/js/main.js')
		.pipe(webpack(config))
		.pipe(gulp.dest('./compiled/js/'));
});

/* compile .scss files to css, with autoprefixer */
gulp.task('sass', function() {
	return gulp.src('./app/css/styles.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./compiled/css/'));
});

/* build js with lint */
gulp.task('js', ['lint', 'webpack']);

/* build everything */
gulp.task('build', ['sass', 'js']);

/* create a simple http server at localhost:8080 */
gulp.task('server', ['build'], function(done) {
	http.createServer(
		st({ path: __dirname + '/', index: 'index.html', cache: false })
	).listen(8080, done);
});

/* watch files for changes and execute tasks */
gulp.task('watch', ['server'], function() {
	gulp.watch('./app/css/**/*.scss', ['sass']);
	gulp.watch('./app/js/**/*.js', ['js']);
});

/* default gulp task */
gulp.task('default', ['watch']);
