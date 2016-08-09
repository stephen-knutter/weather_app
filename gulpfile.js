var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function(){
  nodemon().on('restart', function(){
    console.log('restarted');
  })
});
