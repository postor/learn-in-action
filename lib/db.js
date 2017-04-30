/**
 * @file
 * 数据库操作
 */
const path = require('path')
const db = global.localStorage
const COURSE_TABLE_NAME = 'course:'

//--- 导出 ---
module.exports.setCourse = setCourse
module.exports.getCourse = getCourse

//--- 方法 ---

/**
 * 保存课程进度
 */
function setCourse(obj){
  var {coursePackage} = obj
  if(!coursePackage){
    throw '参数必须设置课程包名';
  }
  coursePackage = path.basename(coursePackage)
  
  db.setItem(COURSE_TABLE_NAME+coursePackage,JSON.stringify(obj))
}

/**
 * 获取课程进度
 */
function getCourse(coursePackage){
  coursePackage = path.basename(coursePackage)
  var objStr = db.getItem(COURSE_TABLE_NAME+coursePackage)
  if(objStr){
    return JSON.parse(objStr)
  }
  return null
}