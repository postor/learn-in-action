import Validate from './Validate'

/**
 * step data type
 * 
 * @class Step
 */
class Step {
  
  constructor(){    
    /**
     * step name
     * @type {string}
     */
    this.title = 'some title',

    /**
     * step description
     * @type {string}
     */
    this.desc = 'some desc',

    /**
     * step page url, show the page when come to this step
     * @type {string}
     */
    this.page = '',

    /**
     * operations to validate in this step
     * @type {Validate[]}
     */
    this.validate = [
      new Validate()
    ] 
  }
}

export default Step