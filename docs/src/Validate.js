/**
 * validate data type
 * 
 * @class Validate
 */
class Validate {

  constructor(){  

    /**
     * a command to validate, it will run inside playground, if the command exit code is not 0, the validate fails
     * @type {string}
     */
    this.command = 'cd some/path'

    /**
     * it takes a cwd argument which means the playground folder, if it does not return true, the validate fails
     * @param {string} cwd current working directory
     * @return {boolean}
     */
    this.callback = (cwd)=>{
      return true
    }

    /**
     * when the validate fails, this message will alert
     * @type {string}
     */
    this.message = 'path not found!'
  }
}

export default Validate