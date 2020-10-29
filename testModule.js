//get each link into targets
module.exports = function test($, from, att){
  $(from).each((i, el) => {
    const link = $(el).attr(att)
    console.log(link)
  })
}
