/* gulpfile
*
* $ npm install gulp browserify vinyl-source-stream vinyl-buffer gulp-uglify gulp-jshint jshint-stylish gulp-sass gulp-autoprefixer http st --save-dev
*
*/

var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	http = require('http'),
	st = require('st');

/* lint js files */
gulp.task('lint', function() {
	return gulp.src('./app/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

/* bundle js modules */
gulp.task('browserify', ['lint'], function() {
	return browserify('./app/js/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'));
});

/* compile .scss files to css */
gulp.task('sass', function() {
	return gulp.src('./app/css/styles.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('./build/css/unprefixed'));
});

/* post-process CSS with autoprefixer */
gulp.task('autoprefix', ['sass'], function() {
	return gulp.src('./build/css/unprefixed/styles.css')
		.pipe(autoprefixer({
			browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
			cascade: false
		}))
		.pipe(gulp.dest('./dist/css/'));
});

/* build js */
gulp.task('js', ['lint', 'browserify']);

/* build everything */
gulp.task('build', ['sass', 'autoprefix', 'js']);

/* create a simple http server at localhost:8080 */
gulp.task('server', function(done) {
	http.createServer(
		st({ path: __dirname + '/', index: 'index.html', cache: false })
	).listen(8080, done);
});

/* watch files for changes and execute tasks */
gulp.task('watch', ['server'], function() {
	gulp.watch('./app/css/**/*.scss', ['sass']);
	gulp.watch('./build/css/**/*.css', ['autoprefix']);
	gulp.watch('./app/js/**/*.js', ['js']);
});

/* default gulp task */
gulp.task('default', ['watch']);
