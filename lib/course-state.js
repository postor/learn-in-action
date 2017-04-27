var fs = require('fs')
var path = require('path')
var db = require('./db.js')

module.exports = {
  isInstalled,
  isFinished,
  setStart,
  setFininshed,
}

/**
 * 是否已安装
 * @param {string} package 
 */
function isInstalled(package){
  var packageName = path.basename(package)
  var dir = path.join(__dirname,'..','node_modules',packageName)
  return (fs.existsSync(dir))
}

/**
 * 是否已学完
 * @param {string} package 
 */
function isFinished(package){
  var course = db.getCourse(package)
  return !!course.finished
}

/**
 * 设置已学完
 * @param {string} package 
 */
function setFininshed(package){
  var course = db.getCourse(package)
  course.finished = true
  db.setCourse(course)
}

/**
 * 设置为刚开始学
 * 
 * @param {string} package 
 */
function setStart(package){
  var course = db.getCourse(package)
  course.finished = false
  course.chapter = 0
  course.step = 0
  db.setCourse(course)
}