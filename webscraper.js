const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const writeStream = fs.createWriteStream('sites.csv')
const url = 'https://wallpapers.com/sitemap.xml'
// Write Headers
writeStream.write(`sites, statusCode\n`)

console.time('test');
fetch(url)
  .then(async (response) => {
    const linksArr = []
    data = await response.text()
    const $ = cheerio.load(data, { xmlMode: true })
    $('loc').each((i, el) => {
      const link = $(el).text()

      linksArr.push(link)

      // Write To CSV
      // writeStream.write(`${link}, ${response.status}\n`)
    })

    return linksArr
  })
  .then((urls) => {
    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
    urls.forEach(async (url) => {
      const timeOut = await timeout(3000);
      response = await fetch(url)
      data = await response.text()
      const $ = cheerio.load(data, { xmlMode: true })
      $('loc').each(async(i, el) => {
        const link = $(el).text()
        writeStream.write(`${link}, ${response.status}\n`)
      })
    })
  })
  .then(() => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    console.log(
      `The script uses approximately ${Math.round(used * 100) / 100} MB`
    )
    console.timeEnd('test'); 
  })
  .catch((err) => console.log(err))
  