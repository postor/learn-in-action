const URL = require('url').URL

var urlObj = new URL(global.location.href)
var package = urlObj.searchParams.get('package')
console.log(package)