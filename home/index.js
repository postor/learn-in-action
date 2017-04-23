var $ = require('jquery')
var db = require('../lib/db.js')
var courseList = require( '../course-list.js')

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
            available.push(course)
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
      continueCourse: function(package){
        
      },
      restartCourse: function(package){

      },
      installCourse: function(package){

      }
    },
    mounted: function(){
      this.setCourses(courseList)
    }
  })
})


function loadCourse(package){
  global.win.loadURL(url.format({
    pathname: path.join(__dirname, 'course', 'index.html?package='+package),
    protocol: 'file:',
    slashes: true
  }))
}

function install(package){
  
}