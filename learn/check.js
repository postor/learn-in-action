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
  if(isFunction(step.validate)){
    return step.validate(moduleName)
  }else{

  }
}  

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}