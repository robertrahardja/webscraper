const xmlWebScraper = require('./modules/xmlWebScraper.js')
const compareUrls = require('./modules/compareUrls.js')
const fs = require('fs')
const writeStream = fs.createWriteStream('sites.csv')
const fetch = require('node-fetch')
const xmlUrl = 'https://wallpapers.com/sitemap.xml'

;(async () => {
  //get html array to compare
  let dupArr = await xmlWebScraper(xmlUrl).catch((err) =>
    console.log(`main: first webscraper error ${err.message}`)
  )

  //remove duplicates
  Arr = [...new Set(dupArr)]

  //get wps01 html array
  ArrOne = Arr.map((url) =>
    url.replace('wallpapers.com', 'wps01.pixel.ieplsg.com')
  )

  
  Arr.sort()
  ArrOne.sort()

  //   console.info(ArrOne)

  chunk = 10
  //check status of ArrOne
  //get second level html url
  // for (i = 0, j = ArrOne.length; i < j; i += chunk) {
  for (i = 0, j = 50; i < j; i += chunk) {
    //slice doesn't change original array
    tempArr = ArrOne.slice(i, i + chunk)

    // fetch array of target html
    const secondTargetArrP = tempArr.map(async (url) => {
      const result = await fetch(url).catch((err) => {
        //Write any errors to csv and console.log, then move on
        console.log(`main ArrOne ${err.message}\n`)
      })

      console.log(`${url}, ${result.status}\n`)
    })

    await Promise.all(secondTargetArrP).catch((err) =>
      console.log(`main: ArrOne url promise all failed: ${err.message}`)
    )
  }

    // //   console.info(Arr)
    // let Arr2 = await webScraper(url).catch((err) => console.log(`main: second webscraper error ${err.message}`))
    // Arr2.sort()

    //compare arrays
    // var arrayLength = Arr.length
    //   for (var i = 0; i < arrayLength; i++) {
    for (var i = 0; i < 50; i++) {
      //for debugging
      console.log(Arr[i])
      console.log(ArrOne[i])
      let output = await compareUrls(Arr[i], ArrOne[i]).catch((err) => console.log(`main: compareUrls error ${err.message}`))
      
      console.log(output)
    }
})()
