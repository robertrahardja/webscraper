const fetch = require('node-fetch')
const cheerio = require('cheerio')

module.exports = async function getPage(url) {
  //get page and load into cheerio
  const result = await fetch(url)
  const data = await result.text()
  const $ = cheerio.load(data)
  return $
}
