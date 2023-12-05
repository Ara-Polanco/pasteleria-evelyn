const {src, dest, watch, parallel, series} = require('gulp')
const sass = require('gulp-sass') (require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

function css(done) {
    src('assets/scss/app.scss')
        .pipe( sass(  ))
        .pipe( postcss( [autoprefixer() ] ) )
        .pipe(dest('build/css'))
    done()

}

function dev(){
    watch('assets/scss/**/*.scss')
}

exports.css = css
exports.dev = dev
exports.default = series( css, dev )
