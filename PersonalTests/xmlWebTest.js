const xmlWebScraper = require('./modules/xmlWebScraper.js')
const xmlUrl = 'https://wallpapers.com/sitemap.xml'
const ObjectsToCsv = require('objects-to-csv')

;(async () => {
    //get html array to compare
    let dupArr = await xmlWebScraper(xmlUrl).catch((err) =>
      console.log(`main: first webscraper error ${err.message}`)
    )
})()