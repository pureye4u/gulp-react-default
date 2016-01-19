var del = require('del'),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
	react = require('gulp-react'),
	uglify = require('gulp-uglify'),
	webserver = require('gulp-webserver'),
	package = require('./package.json');

/**
 * Clean build files
 */
gulp.task('clean', function() {
	del(package.paths.dest.base);
});

/**
 * Transform jsx
 */
gulp.task('jsx', function() {
	gulp.src(package.paths.src.jsx)
		.pipe(react())
		.pipe(concat(package.paths.name.app))
		.pipe(uglify())
		.pipe(gulp.dest(package.paths.dest.js));
});

/**
 * Copy html
 */
gulp.task('html', function() {
	gulp.src(package.paths.src.html)
		.pipe(gulp.dest(package.paths.dest.base));
});

/**
 * Copy images
 */
gulp.task('images', function() {
	gulp.src(package.paths.src.images)
		.pipe(gulp.dest(package.paths.dest.images));
});

/**
 * Minify CSS
 */
gulp.task('css', function() {
	gulp.src(package.paths.src.css)
		.pipe(concat(package.paths.name.style))
		.pipe(cssnano())
		.pipe(gulp.dest(package.paths.dest.css));
});

/**
 * Copy libraries
 */
gulp.task('libs', function() {
	gulp.src(package.paths.libs)
		.pipe(gulp.dest(package.paths.dest.libs));
});

/**
 * Uglify JS
 */
gulp.task('js', function() {
	gulp.src(package.paths.src.js)
		.pipe(uglify())
		.pipe(gulp.dest(package.paths.dest.js));
});

/**
 * Build
 */
gulp.task('build', [
	'html',
	'images',
	'css',
	'libs',
	'js',
	'jsx'
]);
gulp.task('build:clean', [
	'clean',
	'html',
	'images',
	'css',
	'libs',
	'js',
	'jsx'
]);

/**
 * Watch
 */
gulp.task('watch', function() {
	gulp.watch([
		package.paths.src.css,
		package.paths.src.js,
		package.paths.src.jsx,
		package.paths.src.html
	], ['build']);
});
gulp.task('watch:clean', function() {
	gulp.watch([
		package.paths.src.css,
		package.paths.src.js,
		package.paths.src.jsx,
		package.paths.src.html
	], ['build:clean']);
});

/**
 * Web server
 */
gulp.task('webserver', function() {
	gulp.src(package.paths.dest.base)
		.pipe(webserver({
			host: '127.0.0.1',
			port: 8080,
			livereload: true
		}));
});

/**
 * Default
 */
gulp.task('default', [
	'build',
	'watch',
	'webserver'
]);

/**/
