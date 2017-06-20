var gulp = require('gulp')
var jsdoc = require('gulp-jsdoc3');

gulp.task('doc', function (cb) {
  var config = {
    "opts": {
      "destination": "./docs"
    },
    "plugins": [
      "plugins/markdown"
    ],
    "templates": {
      "cleverLinks": false,
      "monospaceLinks": false,
      "default": {
        "outputSourceFiles": true
      },
      "path": "ink-docstrap",
      "theme": "cerulean",
      "navType": "vertical",
      "linenums": true,
      "dateFormat": "YYYY-MM-DD h:mm:ss"
    }
  }

    gulp.src(['docs/src/README.md', 'docs/src/**/*.js'], {read: false})
        .pipe(jsdoc(config, cb))
});

gulp.task('default',['doc'])