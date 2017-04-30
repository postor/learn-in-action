const spawn = require('child_process').spawn
const path = require('path')
const os = require('os')
const fs = require('fs')
const Promise = require('bluebird')
const mkdirp = require('mkdirp')
const ncp = require('ncp').ncp
const helper = require('./helper')
const db = require('./db')
var pncp = Promise.promisify(ncp)

module.exports = function install(package){
  var isWin = /^win/.test(os.platform());
  if(!isWin){
    alert( 'Windows之外的平台尚未支持');
  }
  
  const cmd = `npm.cmd`
  const cwd = path.dirname(__dirname)
  return mySpawn(cmd,['install',`${package}`, '-ddd'],{cwd,})

  .then(()=>{
    mkdirp.sync(helper.getPlayGround(package))
    var course = require(path.basename(package))
    return chain(course.chapters.map((chapter,index)=>{
      return ()=>{
        var targetFolder = helper.getPlayGround(package,index)
        var sourceFolder = chapter.resource || path.join(__dirname,'install','default-playground')
        return pncp(sourceFolder,targetFolder)
        .then(()=>{        
          if(!chapter.resource||!fs.existsSync(path.join(targetFolder,'package.json'))){
            return Promise.resolve()
          }
          return mySpawn(cmd,['install', '-ddd'],{
            cwd:targetFolder,
          })
        })
      }
    }))
  })  
  .then(()=>{
    db.setCourse({      
      chapter: 0,
      step: 0,
      finished: false,
      installed: true,
      coursePackage: package,      
    })
  })
}

/**
 * 
 * @param {*} cmd 
 * @param {*} args 
 * @param {*} opts 
 */
function mySpawn(cmd,args,opts){
  
  console.log(cmd,args,opts)
  return new Promise((resolve,reject)=>{
    const process = spawn(cmd, args, opts)
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

function chain(funcs){
  var promise = funcs[0]();
  for (var i = 1; i < funcs.length; i++){
    promise = promise.then(funcs[i])
  }
  return promise
}