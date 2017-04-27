const spawn = require('child_process').spawn
const path = require('path')
const os = require('os');

module.exports = function install(package){
  return new Promise((resolve,reject)=>{
    var isWin = /^win/.test(os.platform());
    if(!isWin){
      throw 'Windows之外的平台尚未支持';
    }
    
    const cmd = `npm.cmd`
    const cwd = path.dirname(__dirname)
    const process = spawn(cmd, ['install',`${package}`], {cwd,})
    process.stdout.on('data',(data)=>{
      console.log(data.toString())
    })
    process.stderr.on('data',(data)=>{
      console.log(data.toString())
    })
    process.on('close',(code)=>{
      console.log('return code = ${code}')
      if(code){
        reject(code)
      }else{
        resolve(code)
      }
    })
  })
}