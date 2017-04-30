const exec = require('child_process').execSync
const Promise = require('bluebird')
const helper  = require('./helper')

const pexec = Promise.promisify(exec)

module.exports = function(cmd,package,chapter){
  var cwd = helper.getPlayGround(package,chapter)
  return pexec(cmd,{cwd,})
}