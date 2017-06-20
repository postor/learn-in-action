import Chapter from './Chapter'

/**
 * Course data type
 * 
 * @class Course
 */
class Course {
  
  constructor(){    
    /**
     * course name
     * @type {string}
     */
    this.title = 'some title',

    /**
     * chapters
     * @type {Chapter[]}
     */
    this.chapters = [
      new Chapter()
    ] 
  }
}

export default Course