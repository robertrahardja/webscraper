const xmlWebScraper = require('./modules/xmlWebScraper.js')
const compareUrls = require('./modules/compareUrls.js')
const fetch = require('node-fetch')
const xmlUrl = 'https://wallpapers.com/sitemap.xml'
const timeOut = require('./utils/timeoutPromise.js')
const get$ = require('./modules/get$')
const ObjectsToCsv = require('objects-to-csv')

;(async () => {
  //get html array to compare
  let dupArr = await xmlWebScraper(xmlUrl).catch((err) =>
    console.log(`main: first webscraper error ${err.message}`)
  )

  console.log(`removing duplicates`)
  Arr = [...new Set(dupArr)]

  //get wps01 html array
  ArrOne = Arr.map((url) =>
    url.replace('wallpapers.com', 'wps01.pixel.ieplsg.com')
  )

  Arr.sort()
  ArrOne.sort()

  let toCSVArr = []
  //check status of ArrOne

  let errArr = []

  chunk = 10
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
        errArr.push(err)
      })
      if (result.status != 200) {
        // writeStream.write(`${url}, ${result.status}, ${err}\n`)

        errArr.push(`${url}, ${result.status}, ${err}\n`)
        console.log(`${url}, ${result.status}, ${err}\n`)
      }

      console.log(`test ${url}, ${result.status}\n`)
    })

    await Promise.all(secondTargetArrP).catch((err) =>
      console.log(`main: ArrOne url promise all failed: ${err}`)
    )
    //wait 3 seconds for next chunk
    await timeOut
  }

  // Save to file:
  const errCsv = new ObjectsToCsv(errArr)
  await errCsv.toDisk('./errors.csv').catch((err) => {
    ;`Error writting to error.csv`
  })

  //Compare two arrays
  for (var i = 0; i < Arr.length; i++) {
    $ = await get$(Arr[i])
    $1 = await get$(ArrOne[i])

    console.log(Arr[i])
    let obj = {}

    //main url
    obj['main_url'] = Arr[i]
    obj['slug'] = Arr[i].replace('https://wallpapers.com/wallpapers', '')
    obj['url_one'] = ArrOne[i]

    // title:
    $('title').text() == $1('title').text()
      ? (obj['title'] = 'true')
      : (obj['title'] = 'false')

    // h1Text:
    $('h1').text() == $1('h1').text()
      ? (obj['H1_text'] = 'true')
      : (obj['H1_text'] = 'false')

    //Meta description
    $('meta[name="description"]').attr('content') ==
    $1('meta[name="description"]').attr('content')
      ? (obj['Meta_description'] = 'true')
      : (obj['Meta_description'] = 'false')

    //main image
    $('.post-image lozad').attr('src') == $1('.post-image lozad').attr('src')
      ? (obj['main_img'] = 'true')
      : (obj['main_img'] = 'false')

    //main image alt
    $('.post-image lozad').attr('alt') == $1('.post-image lozad').attr('alt')
      ? (obj['main_img_alt'] = 'true')
      : (obj['main_img_alt'] = 'false')

    toCSVArr.push(obj)
  }

  const csv = new ObjectsToCsv(toCSVArr)

  // Save to file:
  await csv.toDisk('./result.csv').catch((err) => {
    ;`Error writting to result.csv`
  })
  // Return the CSV file as string:
  console.log(await csv.toString())
})()
