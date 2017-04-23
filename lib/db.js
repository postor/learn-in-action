/**
 * @file
 * 数据库操作
 */

const db = global.localStorage
const COURSE_TABLE_NAME = 'course'

//--- 导出 ---
module.exports.setCourse = setCourse
module.exports.getCourse = getCourse
module.exports.getCourses = getCourses

//--- 方法 ---

/**
 * 保存课程进度
 */
function setCourse(obj){
  var {coursePackage} = obj
  if(!coursePackage){
    throw '参数必须设置课程包名';
  }
  var courses = getCourses()
  var filtered = filter(courses,{coursePackage})
  if(filtered.length){
    Object.assign(filtered[0],obj)
  }else{
    courses.push(obj)
  }
  db.setItem(COURSE_TABLE_NAME,courses)
}

/**
 * 获取课程进度
 */
function getCourse(coursePackage){
  var list = getCourses({coursePackage})
  return list.length?list[0]:null
}

function getCourses(filter){
  var courses = db.getItem(COURSE_TABLE_NAME)
  if(!courses) return []

  if(filter){
    return filter(courses,filter)
  }else{
    return courses
  }
}

function filter(list,filter){
  return list.filter((item)=>{
    return Object.keys(filter).every((k)=>{
      return item[k] == filter[k]
    })
  })
}