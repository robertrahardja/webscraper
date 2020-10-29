const webscraper = require('./modules/webscraper.js')

const url = 'https://wallpapers.com/sitemap.xml'

;(async () => {
  let Arr = await webscraper(url)
  console.info(Arr)
})()
