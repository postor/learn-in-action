var fs = require('fs')
var path = require('path')
var db = require('./db')

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
  try{require(path.basename(package))}
  catch(e){
    return false
  }
  var course = db.getCourse(package)
  if(!course) return false  
  return !!course.installed
}

/**
 * 是否已学完
 * @param {string} package 
 */
function isFinished(package){
  var course = db.getCourse(package)
  if(!course) return false
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