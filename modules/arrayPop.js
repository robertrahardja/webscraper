module.exports = function populatingArray($, arr) {

  // title:
  arr.push($('title').text())
  // h1Text:
  arr.push($('h1').text())
  // // canonical:
  // arr.push($('link[rel="canonical"]').attr('href'))
  // description:
  // arr.push($('meta[name="description"]').attr('content'))
  // // Get OG Values
  // // og_title:
  // arr.push($('meta[property="og:title"]').attr('content'))
  // // og_url:
  // arr.push($('meta[property="og:url"]').attr('content'))
  // // og_img:
  // arr.push($('meta[property="og:image"]').attr('content'))
  // // og_type:
  // arr.push($('meta[property="og:type"]').attr('content'))

  // links = $('main img')
  // $(links).each(function (i, link) {
  //   arr.push($(link).attr('data-src'))
  // })

  // links = $('main img')
  // $(links).each(function (i, link) {
  //   arr.push($(link).attr('alt'))
  // })

  // console.info(arr)
  return arr
}
