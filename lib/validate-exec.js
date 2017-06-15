const execSync = require('child_process').execSync
const Promise = require('bluebird')
const helper  = require('./helper')

module.exports = function(validate,package,chapter){
  
  var cwd = helper.getPlayGround(package,chapter)
  
  if(!Array.isArray(validate)){
    return checkItem(validate)
  }else{
    return validate.every((item)=>checkItem(item))
  }

  function checkItem(item){
    if(item.callback){
      return checkCallback(cwd,item.message)
    }else if(item.command){
      return checkCommand(item.command,item.message)
    }else if(typeof item === 'string'){
      return checkCommand(item, item+'运行失败')
    }else if(item.call){
      return checkCallback(item,item.toString()+'验证失败')
    }
  }

  function checkCallback(callback, msg){
    var rtn = callback(cwd)
    if(!rtn){
      alert(msg)
    }
    return rtn
  }

  function checkCommand(cmd, msg){
    try{
      console.log([cmd,cwd])
      execSync(cmd,{cwd,})
      return true
    }catch(e){
      alert(msg)
      console.log(e)
      return false
    }
  }
}