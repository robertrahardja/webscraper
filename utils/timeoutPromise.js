module.export = async function timeOut() {
  return new Promise((resolve) => setTimeout(resolve, 3000))
}
