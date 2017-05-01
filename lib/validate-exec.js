const execSync = require('child_process').execSync
const Promise = require('bluebird')
const helper  = require('./helper')

module.exports = function(cmd,package,chapter){
  
  var cwd = helper.getPlayGround(package,chapter)
  if(typeof cmd == 'string'){
    try{
      console.log([cmd,cwd])
      execSync(cmd,{cwd,})
      return true
    }catch(e){
      console.log(e)
      return false
    }
  }else if(cmd.call){
    return cmd(cwd)
  }else{
    alert(`课程${package} 章节${chapter} 的验证 ${cmd.toString()} 类型非字符串亦非函数`)
  }
}