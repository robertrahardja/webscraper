const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const writeStream = fs.createWriteStream('sites.csv')
const url = 'https://wallpapers.com/sitemap.xml'
const perf = require('execution-time')()

//at beginning of your code to calculate execution time
perf.start()

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

;(async () => {
  //write header
  writeStream.write(`sites, statusCode\n`)

  //get page and load into cheerio
  const result = await fetch(url)
  const data = await result.text()
  const $ = cheerio.load(data, { xmlMode: true })

  const xmlArr = []

  //get each link into targets
  $('sitemap loc').each((i, el) => {
    const link = $(el).text()
    xmlArr.push(link)
  })

  let targets = []

  //put html links from xmlArr into targets array
  //xmlArrP is an array of promise
  const xmlArrP = xmlArr.map(async (url) => {
    //get page and load into cheerio
    const result = await fetch(url)
    const data = await result.text()
    const $ = cheerio.load(data, { xmlMode: true })

    //get each link into targets
    $('url loc').each((i, el) => {
      const link = $(el).text()
      targets.push(link)
    })
  })

  await Promise.all(xmlArrP)

  //slice targets into chunks, increasing i in chunk
  var i,
    j,
    tempArr,
    chunk = 10
  // for (i = 0, j = targets.length; i < j; i += chunk) {
    for (i = 0, j = 100; i < j; i += chunk) {

    //slice doesn't change original array
    tempArr = targets.slice(i, i + chunk)

    // fetch array of target html
    const targetArrP = tempArr.map(async (url) => {
      const result = await fetch(url).catch((err) => {
        //Write any errors to csv and console.log, then move on
        writeStream.write(`${err.message}\n`)
      })
      writeStream.write(`${url}, ${result.status}\n`)
    })

    await Promise.all(targetArrP).catch((err) => console.log(err.message))

    //wait 3 seconds for next chunk
    timeout(3000)
  }

  //at end of your code
  const results = perf.stop()
  console.log(results.time) // in milliseconds
})()
