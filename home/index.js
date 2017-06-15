var path = require('path')
var url = require('url')
//var install = require('exec-npm-install')
var Promise = require('bluebird')
var courseList = require( '../course-list')
var db = require('../lib/db')
var install = require('../lib/install')
var courseState = require('../lib/course-state')
var helper = require('../lib/helper')

//var pinstall = Promise.promisify(install)
var win

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
        course.installing = false
        var courseStep = db.getCourse(course.package)
        if(!courseState.isInstalled(course.package)){
          available.push(course)
        }else if(!courseStep){            
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
      courseState.setStart(course.package)
      this.setCourses(courseList)
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
        console.log(err)
        alert(err.toString())
      })

    }
  },
  mounted: function(){
    this.setCourses(courseList)
  }
})


function loadCourse(package){
  var packageName = path.basename(package)
  var windowUrl = url.format({
    pathname: path.join(__dirname, '..', 'course', 'index.html'),
    protocol: 'file:',
    slashes: true,
    query:{
      package: packageName,
    }
  })
  helper.loadUrl(windowUrl)
  /*
  win = helper.createWindow(windowUrl)
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
    
    vm.setCourses(courseList)
  })
  */
}

