const fetch = require('node-fetch')
const cheerio = require('cheerio')


module.exports = async function get$(url) {
  //get page and load into cheerio
  const result = await fetch(url).catch(err => console.log(`getPage: Error on fetching url in getPage ${err}\n`))
  const data = await result.text().catch(err => console.log(`getPage: Error on getting text from result ${err}\n`))
  const $ = cheerio.load(data)
  return $
}
