const url =
  'https://wallpapers.com/wallpapers/pc-wallpaper-hd-pieqqvn9v2z6yspx.html'
const url2 = 'https://wallpapers.com/hd'
const arrPop = require('./modules/arrayPop.js')
const getPage = require('./modules/getPage.js')
const setArrayEquals = require('./modules/arrayEquals.js')

module.exports = async function compareUrls(url, url2) {

    // info from first website
    let firstArray = []
    $ = await getPage(url)
    arrPop($, firstArray)

    // info from second website
    let secondArray = []
    $ = await getPage(url2)
    arrPop($, secondArray)

    setArrayEquals()

    console.log(firstArray.equals(secondArray))

    //   console.info(secondArray)

}
