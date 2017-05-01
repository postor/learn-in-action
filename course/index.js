const url = require('url')
const path = require('path')
const helper = require('../lib/helper')
const db = require('../lib/db')
const validate = require('../lib/validate-exec')

const URL = url.URL

var urlObj = new URL(global.location.href)
var package = urlObj.searchParams.get('package')

var course = require(package)
var stepInfo = db.getCourse(package)
if(!stepInfo){
  stepInfo = {
    chapter: 0,
    step: 0,
    finished: false,
  }
}
if(stepInfo.chapter>=course.chapters.length){
  stepInfo.chapter=course.chapters.length-1
}

var vm = new Vue({
  el: '#app',
  data: {
    title: course.title || package,
    course: course,
    stepInfo: stepInfo,
    chapter: course.chapters[stepInfo.chapter],
    step: course.chapters[stepInfo.chapter][stepInfo.step],
    iframeSrc: 'about:blank',
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
      var step = this.getCurrentStep()
      
      if(!this.isLastStep()){
        stepInfo.step++
      }else if(!this.isLastChapter()){
        stepInfo.step=0
        stepInfo.chapter++
        this.chapter = course.chapters[stepInfo.chapter]
      }else{
        stepInfo.finished = true        
      }
      this.updateStep()
    },    
    prevStep: function(){
      var stepInfo = this.stepInfo
      var course = this.course
      var chapter = this.chapter
      var step = this.getCurrentStep()
      
      if(stepInfo.step > 0){
        stepInfo.step--
      }else if(stepInfo.chapter > 0){
        stepInfo.chapter--
        this.chapter = course.chapters[stepInfo.chapter]
        stepInfo.step = this.chapter.steps.length -1
      }
      this.updateStep()
    },
    validateStep: function(){
      var step = this.getCurrentStep()
      if(step.validate){
        if(validate(step.validate,package,this.stepInfo.chapter)){
          this.nextStep()
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
      return stepInfo.chapter == course.chapters.length-1
    },
    getCurrentStep: function(){
      return this.chapter.steps[this.stepInfo.step]
    },
    updateStep: function(){
      
      var stepInfo = this.stepInfo
      var course = this.course
      var chapter = this.chapter

      //更新数据库
      db.setCourse(Object.assign({
        coursePackage: package,        
      },stepInfo))

      //如果完成了则跳转
      if(stepInfo.finished){
        var href = url.format({
          pathname: path.join(__dirname, '..', 'home', 'index.html'),
          protocol: 'file:',
          slashes: true
        })
        console.log([href])
        
        helper.loadUrl(href)
      }

      //如果没完成则还需更新提示
      var newStep = this.getCurrentStep()
      if(newStep.page){
        this.iframeSrc = newStep.page
      }else{
        this.iframeSrc = 'about:blank'
      }
    }
  },
  mounted: function(){
    this.updateStep()
  },
});