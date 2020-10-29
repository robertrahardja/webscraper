const webscraper = require('./modules/webscraper.js')
const compareUrls = require('./modules/compareUrls.js')

const url = 'https://wallpapers.com/sitemap.xml'

;(async () => {
  let Arr = await webscraper(url)
  Arr.sort()

  //   console.info(Arr)
  let Arr2 = await webscraper(url)
  Arr2.sort()

  //compare arrays
  var arrayLength = Arr.length
//   for (var i = 0; i < arrayLength; i++) {
    for (var i = 0; i < 50; i++) {//for debugging
        // console.log(Arr[i])
        // console.log(Arr2[i])
        let output = await compareUrls(Arr[i], Arr2[i])
    console.log(output)
  }
})()
