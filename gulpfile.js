var gulp = require('gulp')
var babel = require('gulp-babel')
var rename = require('gulp-rename')

const presets = ['es2015']

const paths = {}
paths.stash = '/'
paths.exercises = './exercises'
paths.scripts = [{src: paths.exercises + '/simple_scene/*.js', exercise: '/simple_scene'}]
paths.dest = '/build'

function buildExercises () {
  var exercises = paths.scripts.map(function (pathScript) {
    return gulp.src(pathScript.src)
      .pipe(babel({
        'presets': presets
      }))
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest('exercises' + pathScript.exercise))
  })
  return exercises
}

gulp.task('babel', buildExercises)
