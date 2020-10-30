const fetch = require('node-fetch')
const cheerio = require('cheerio')
const perf = require('execution-time')()
const timeOut = require('../utils/timeoutPromise.js')
const getPage = require('./getPage.js')

module.exports = async function webScraper(url) {
  //at beginning of your code to calculate execution time
  perf.start()

  //get main url
  $ = await getPage(url).catch((err) => {
    //   //Write any errors to csv then move on
    console.log(`webScraper: getPage url one error: ${err.message}\n`)
  })

  const xmlArr = []

  //get each link into xmlArr
  $('sitemap loc').each((i, el) => {
    const link = $(el).text()
    xmlArr.push(link)
  })

  let partialHTMLArr = []

  //put html links from xmlArr into partialHTMLArr array
  //xmlArrP is an array of promise
  const xmlArrP = xmlArr.map(async (url) => {
    //get page and load into cheerio
    const result = await fetch(url).catch((err) =>
      console.log(`xmlWebScraper: xmlArrP fetch url error ${err.message}`)
    )
    const data = await result
      .text()
      .catch((err) =>
        console.log(`xmlWebScraper: xmlArrP text result error ${err.message}`)
      )
    const $ = cheerio.load(data, { xmlMode: true })

    //get each link into partialHTMLArr
    $('url loc').each((i, el) => {
      const link = $(el).text()
      partialHTMLArr.push(link)
    })

    await timeOut
  })

  await Promise.all(xmlArrP).catch((err) =>
    console.log((err) => `webScraper: promise.all on xmlArrP ${err}`)
  )

  let totalHTMLArr = []

  //slice partialHTMLArr into chunks, increasing i in chunk
  var i,
    j,
    tempArr,
    chunk = 10
  // for (i = 0, j = partialHTMLArr.length; i < j; i += chunk) {
  for (i = 0, j = 100; i < j; i += chunk) {
    //slice doesn't change original array
    tempArr = partialHTMLArr.slice(i, i + chunk)

    // fetch array of target html
    const targetArrP = tempArr.map(async (url) => {
      //get page and load into cheerio
      const result = await fetch(url).catch((err) => {
        // Write any errors to csv then move on
        console.log(`xmlWebScraper targetArrp fetch url: ${err.message}\n`)
      })
      const data = await result
        .text()
        .catch((err) =>
          console.log(`webScraper: targetArrP text result error ${err.message}`)
        )
      const $ = cheerio.load(data)

      //get each link into totalHTMLArr
      $('.card a').each((i, el) => {
        const link = $(el).attr('href')
        totalHTMLArr.push(link)
        // outputArr.push(link)
      })
      console.log(`${url}, ${result.status}\n`)
    })

    await Promise.all(targetArrP).catch((err) =>
      console.log(`xmlWebScraper targetArrP promise all${err.message}`)
    )

    //wait 3 seconds for next chunk
    await timeOut
  }

  //get second level html url
  // for (i = 0, j = totalHTMLArr.length; i < j; i += chunk) {
  for (i = 0, j = 50; i < j; i += chunk) {
    //slice doesn't change original array
    tempArr = totalHTMLArr.slice(i, i + chunk)

    // fetch array of target html
    const secondTargetArrP = tempArr.map(async (url) => {
      const result = await fetch(url).catch((err) => {
        //Write any errors to csv and console.log, then move on
        console.log(`xmlWebScraper secondTargetArrp ${err.message}\n`)
      })

      console.log(`${url}, ${result.status}\n`)
    })

    await Promise.all(secondTargetArrP).catch((err) =>
      console.log(
        `webScraper: secondTargetArrP url promise all failed: ${err.message}`
      )
    )

    //wait 3 seconds for next chunk
    await timeOut
  }

  //at end of your code
  const results = perf.stop()
  console.log(results.time) // in milliseconds
  return totalHTMLArr //outputs array of htmls
}
