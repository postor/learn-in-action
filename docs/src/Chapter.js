import Step from './Step'

/**
 * chapter data type
 * 
 * @class Chapter
 */
class Chapter {
  
  constructor(){    
    /**
     * chapter name
     * @type {string}
     */
    this.title = 'some title',

    /**
     * chapter description
     * @type {string}
     */
    this.desc = 'some desc',

    /**
     * steps
     * @type {Step[]}
     */
    this.steps = [
      new Step()
    ] 
  }
}

export default Chapter