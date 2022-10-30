const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const copy = require('gulp-copy');
// const babel = require('gulp-babel')
// const watch = require('gulp-watch')
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
var exec = require('child_process').exec;
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

gulp.task('default', function() {
  return gulp.src('./public/img', {read: false})
  .pipe(clean());
})
gulp.task('default', ['cleanCSS','styles','scripts','copy-css','imagemin','browser-sync'], () => {
  gulp.watch('./assets/styles/sass/**/*', ['styles'])
  gulp.watch('./assets/js/**/*', ['scripts'])
  gulp.watch(['./public/**/*', './public/*', '!public/js/**/.#*js', '!public/css/**/.#*css']).on('change', reload)
})

gulp.task('cleanCSS', function () {
  return gulp.src('./public/css/*.css', {read: false})
      .pipe(clean());
});

gulp.task('styles', () => {
  gulp.src('assets/styles/sass/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
      .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
})

gulp.task('copy-css', function() {
  return gulp.src('./assets/styles/css/*.css')
    .pipe(gulp.dest('./public/css'));
});
// gulp.task('css', () => {
//   gulp.src('assets/styles/css/*.css')
//     .pipe(concat('appcss.css'))
//     .pipe(gulp.dest('./public/css'))
//     .pipe(browserSync.stream())
// })

// gulp.task('minify-css', () => {
//   return gulp.src('/public/css/*.css')
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('scripts', () => {
  gulp.src('assets/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream())
})

gulp.task('imagemin', () => {
  var imgSrc = 'assets/images/*.+(jpg|png|gif)',
  imgDst = './public/img';
  
  gulp.src(imgSrc)
  .pipe(changed(imgDst))
  .pipe(imagemin())
  .pipe(gulp.dest(imgDst));
});
// (async () => {
//   const files = await imagemin(['assets/images/*.{jpg,png}'], {
//     destination: './public/img',
//       plugins: [
//           imageminJpegtran(),
//           imageminPngquant({
//               quality: [0.6, 0.8]
//           })
//       ]
//   });

//   console.log(files);
//   //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
// })();



gulp.task('browser-sync', ['cleanCSS','styles','scripts','copy-css','imagemin'], function () {
  // THIS IS FOR SITUATIONS WHEN YOU HAVE ANOTHER SERVER RUNNING
  // browserSync.init({
  //   proxy: {
  //     target: 'localhost:3000', // can be [virtual host, sub-directory, localhost with port]
  //     ws: true // enables websockets
  //   },
  //   serveStatic: ['.', './public']
  // })

  browserSync.init({
        server: './public',
        notify: false,
        open: false //change this to true if you want the broser to open automatically 
    });
})

// gulp.task('webpack', (cb) => {
//   exec('webpack', function (err, stdout, stderr) {
//       console.log(stdout);
//       console.log(stderr);
//       cb(err);
//     });
// })

// gulp.task('webpack', shell.task([
//   'webpack'
// ]))

// gulp.task('server', shell.task([
//   'yarn run server'
// ]))
