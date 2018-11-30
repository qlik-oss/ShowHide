/* global require process Buffer */
var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

var DIST = './dist',
	SRC = './src',
	NAME = pkg.name;

gulp.task('qext', function () {
	var qext = {
		name: 'Show/hide container',
		type: 'visualization',
		description: pkg.description,
		version: pkg.version,
		icon: 'general-data-class',
		preview: 'qlik-show-hide-container.png',
		keywords: 'qlik-sense, visualization',
		author: pkg.author,
		homepage: pkg.homepage,
		license: pkg.license,
		repository: pkg.repository,
		installer: 'QlikExtensionBundler',
		bundle: {
			id: 'qlik-dashboard-bundle',
			name: 'Qlik Dashboard bundle',
			description: 'This is a set of supported extensions that will facilitate dashboard creation in Qlik Sense: A navigation button, a date picker, a slider, and two different container objects. These can be used in addition to the native objects found under "Charts".\n\nFor limitations and support conditions, see the documentation.'
		},
		dependencies: {
			'qlik-sense': '>=5.5.x'
		}
	};
	if (pkg.contributors) {
		qext.contributors = pkg.contributors;
	}
	var src = require('stream').Readable({
		objectMode: true
	});
	src._read = function () {
		this.push(new gutil.File({
			cwd: '',
			base: '',
			path: NAME + '.qext',
			contents: new Buffer(JSON.stringify(qext, null, 4))
		}));
		this.push(null);
	};
	return src.pipe(gulp.dest(DIST));
});

gulp.task('clean', function (ready) {
	var del = require('del');
	del.sync([DIST]);
	ready();
});

gulp.task('build',['clean', 'qext'], function () {
    gulp.src(SRC + '/**/*.png')
		.pipe(gulp.dest(DIST));

	return gulp.src(SRC + '/**/*.js')
		.pipe(uglify({mangle:false}))
		.pipe(gulp.dest(DIST));
});

gulp.task('zip', ['build'], function () {
	var zip = require('gulp-zip');

	return gulp.src(DIST + '/**/*')
		.pipe(zip(`${NAME}_${pkg.version}.zip`))
		.pipe(gulp.dest(DIST));
});

gulp.task('debug', ['clean', 'qext'], function () {
	return gulp.src([
		SRC + '/**/*.png', 
		SRC + '/**/*.js',
		DIST + '/**/*.qext'
	])
		.pipe(gulp.dest(DIST));
});

gulp.task('default', ['build']);