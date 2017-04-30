const url = require('url')
const path = require('path')
const helper = require('../lib/helper')
const db = require('../lib/db')
const validate = require('../lib/validate-exec')

const URL = url.URL

var urlObj = new URL(global.location.href)
var package = urlObj.searchParams.get('package')

var course = require(package)

console.log(course)
var stepInfo = db.getCourse(package)
if(!stepInfo){
  stepInfo = {
    chapter: 0,
    step: 0,
    finished: false,
  }
}

var vm = new Vue({
  el: '#app',
  data: {
    title: course.title || package,
    course: course,
    stepInfo: stepInfo,
    chapter: course.chapters[stepInfo.chapter],
  },
  methods: {
    loadMain: function(){      
      helper.loadUrl(url.format({
        pathname: path.join(__dirname, '..', 'home', 'index.html'),
        protocol: 'file:',
        slashes: true
      }))
    },
    nextStep: function(){
      var stepInfo = this.stepInfo
      var course = this.course
      var chapter = this.chapter
      if(!this.isLastStep()){
        stepInfo.step++
      }else if(!this.isLastChapter()){
        stepInfo.step=0
        stepInfo.chapter++
        this.chapter = course.chapters[stepInfo.chapter]
      }else{
        stepInfo.finished = true        
      }
      db.setCourse(Object.assign({
        coursePackage: package,        
      },stepInfo))
      if(stepInfo.finished){
        helper.loadUrl(url.format({
          pathname: path.join(__dirname, '..', 'home', 'index.html'),
          protocol: 'file:',
          slashes: true
        }))
      }
    },
    validateStep: function(){
      var step = this.getCurrentStep()
      if(step.validate){
        if(typeof step.validate == 'string'){
          //exec
          var execSync = require('child_process')
          try{
            execSync()
          }catch(e){
            console.log(e)
          }
        }else{

        }
      }
    },
    isLastStep: function(){      
      var stepInfo = this.stepInfo
      var chapter = this.chapter
      return stepInfo.step == chapter.steps.length-1
    },
    isLastChapter: function(){      
      var stepInfo = this.stepInfo
      var course = this.course
      return stepInfo.step.chapter == course.chapters.length-1
    },
    getCurrentStep: function(){
      return this.chapter.steps[this.stepInfo.step]
    }
  },
});