const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const writeStream = fs.createWriteStream('sites.csv')
const url = 'https://wallpapers.com/sitemap.xml'

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

;(async () => {
  //write header
  writeStream.write(`status, sites, statusCode\n`)

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

  //put links in xml into an array
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

  // fetch array of target html
  const targetArrP = targets.map(async (url) => {
    const result = await fetch(url)
    writeStream.write(`${url}, ${result.status}\n`)
  })

  await Promise.all(targetArrP)
})()
