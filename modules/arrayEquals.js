module.exports = function arrayEquals() {
  //compare two arrays
  // Warn if overriding existing method
  if (Array.prototype.equals)
    // console.warn(
    //   "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
    // )
    return true//return as nothing else should be done
  // attach the .equals method to Array's prototype to call it on any array
  Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array) {
        console.log('falsy value');
        return false
    }
    
    // compare lengths - can save a lot of time
    if (this.length != array.length) {
        console.log('false length')
        return false
    }

    for (var i = 0, l = this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i])) {
            console.log(`recurse ${this[i]}`)
            console.log(`recurse vs ${array[i]}`)
            return false}
      } else if (this[i] != array[i]) {
        console.log(`${this[i]}`)
        console.log(`vs ${array[i]}`) 
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false
      }
    }
    return true
  }
  // Hide method from for-in loops
  Object.defineProperty(Array.prototype, 'equals', { enumerable: false })
}
