const webscraper = require('./modules/webscraper.js')
const compareUrls = require('./modules/compareUrls.js')

const url = 'https://wallpapers.com/sitemap.xml'

;(async () => {
  let Arr = await webscraper(url)
  //   console.info(Arr)
  let Arr2 = await webscraper(url)
  
  //compare arrays
  var arrayLength = Arr.length
//   for (var i = 0; i < arrayLength; i++) {
    for (var i = 0; i < 50; i++) {//for debugging
    let output = await compareUrls(Arr[i], Arr2[i])
    console.log(output)
  }
})()
