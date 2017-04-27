var path = require('path')
var $ = require('jquery')
//var install = require('exec-npm-install')
var Promise = require('bluebird')
var courseList = require( '../course-list.js')
var db = require('../lib/db.js')
var install = require('../lib/install.js')
var courseState = require('../lib/course-state.js')

//var pinstall = Promise.promisify(install)

$(document).ready(()=>{
  var vm = new Vue({
    el: '#app',
    data: {
      learning: [],
      available: [],
      finished: [],
    },
    methods: {
      setCourses: function(courseList){
        var learning = [], available = [], finished = [];
        courseList.forEach(function(course) {
          var courseStep = db.getCourse(course.package)
          if(!courseStep){            
            if(courseState.isInstalled(course.package)){
              learning.push(course)
            }else{
              available.push(course)
            }
          }else if(courseStep.finished){
            finished.push(course)
          }else{
            console.log(courseStep)
            course.stepInfo = courseStep
            learning.push(course)
          }
        })

        this.learning = learning
        this.available = available
        this.finished = finished
      },
      continueCourse: function(course){
          loadCourse(course.package)        
      },
      restartCourse: function(course){
      },
      installCourse: function(course){
        course.installing = true
        install(course.package)
        .then(()=>{
          course.installing = false
          loadCourse(course.package)
        })
        .catch((err)=>{
          course.installing = false
          alert(err.toString())
        })

      }
    },
    mounted: function(){
      this.setCourses(courseList)
    }
  })
})


function loadCourse(package){
  var filePath = path.join(__dirname, 'course', 'index.html')
  var packageName = path.basename(package)
  var url = `file://${filePath}?package=${packageName}`

  global.win.loadURL(url)
}

