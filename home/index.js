import $ from 'jquery'
import courseList from '../course-list.js'

$(document).ready(()=>{
  var vm = new Vue({
    el: '#app',
    data: {
      courses:courseList,
    }
  })
})
