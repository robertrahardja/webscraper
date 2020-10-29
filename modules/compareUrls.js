const arrPop = require('./arrayPop.js')
const getPage = require('./getPage.js')
const setArrayEquals = require('./arrayEquals.js')

module.exports = async function compareUrls(url, url2) {
  // info from first website
  let firstArray = []
  $ = await getPage(url)
  arrPop($, firstArray)
  console.log(firstArray[0])

  // info from second website
  let secondArray = []
  $ = await getPage(url2)
  arrPop($, secondArray)
  console.log(secondArray[0])

  setArrayEquals()

  return firstArray.equals(secondArray)

  //   console.info(secondArray)
}
