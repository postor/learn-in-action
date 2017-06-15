const _ = require('lodash')
const exec = require('child_process').exec;

/**
 * 检查某模课程是否全部完成
 * @param {string} moduleName 
 */
export function checkAll(moduleName){  
  var {chapters} = require(moduleName)
  return chapters.every((chapter)=>{
    return steps.every((step)=>{
      return checkStep(step,moduleName,chapter)
    })
  })
}

/**
 * 
 * @param {function|string} step 
 * @param {string} moduleName 
 */
export function checkStep(step,moduleName){
  if(!step.validate) return true
  if(_.isArray(step.validate)){
    return step.validate.every((item)=>{
      return checkItem(item)
    })
  }else{
    return checkItem(item) 
  }
  

  function checkItem(item){
    if(item.cmd){
      return checkCommand(item.cmd)
    }else if(item.callback){
      return checkFunction(item.callback)
    }else{
      return true
    }
  }

  function checkFunction(fun){
    if(fun())
  }

  function checkCommand(cmd){
    
  }
} 