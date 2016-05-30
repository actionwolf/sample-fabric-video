var gulp = require('gulp');
var browserify = require('gulp-browserify');
var gulpif = require('gulp-if');
var gulpclean = require('gulp-clean');
var react = require('gulp-react');

require('reactify');

gulp.task('clean', function(){
	return gulp.src('dist', { read: false })
		.pipe(gulpclean({ force: true }));
});

gulp.task('move:static:data', function(){
	return gulp.src('data/**/*.*')
		.pipe(gulp.dest('dist/data'));
});

gulp.task('move:static:image', function(){
	return gulp.src('image/**/*.*')
		.pipe(gulp.dest('dist/image'));
});

gulp.task('move:static:video', function(){
	return gulp.src('video/**/*.*')
		.pipe(gulp.dest('dist/video'));
});

gulp.task('move:static', ['move:static:data', 'move:static:image', 'move:static:video'], function(){});

/***********************************************************************************************************************
 *
 * [WEBM]
 *
 **********************************************************************************************************************/
gulp.task('build:webm:js', function(){
	return gulp.src('src/webm/app.js')
		.pipe(browserify({
			debug: true
		}))
		.pipe(gulp.dest('dist/build/webm'));
});

gulp.task('build:webm', ['move:static', 'build:webm:js'], function(){
	return gulp.src('src/webm/index.html')
		.pipe(gulp.dest('dist/build/webm/'));
});

/***********************************************************************************************************************
 *
 * [CANVAS-VIDEO]
 *
 **********************************************************************************************************************/
gulp.task('build:canvas:js', function(){
	return gulp.src('src/canvas/app.video.js')
		.pipe(browserify({
			debug: true
		}))
		.pipe(gulp.dest('dist/build/canvas'));
});

gulp.task('build:canvas', ['move:static', 'build:canvas:js'], function(){
	return gulp.src('src/canvas/**.html')
		.pipe(gulp.dest('dist/build/canvas'));
});