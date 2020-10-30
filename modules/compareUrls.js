const arrPop = require('./arrayPop.js')
const getPage = require('./get$.js')
const setArrayEquals = require('./setArrayEquals.js')

module.exports = async function compareUrls(url, url2) {
  // info from first website
  let firstArray = []
  $ = await getPage(url).catch(err => console.error(`compareUrls: Error on getting first array url ${err}`))
  arrPop($, firstArray)

  // info from second website
  let secondArray = []
  $ = await getPage(url2).catch(err => console.error(`compareUrls: Error on getting second array url ${err}`))
  arrPop($, secondArray)

  setArrayEquals()

  return firstArray.equals(secondArray)

}
