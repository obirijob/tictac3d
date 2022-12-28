/** @format */
const constants = require('../helpers/constants')

module.exports = async function (url) {
  await fetch(`${constants.url}${url}`, { method: 'GET' }).then(async r => {
    if (r.ok) {
      let data = await r.json()
      return data
    } else {
      let error = await r.json()
      throw new Error(error)
    }
  })
}
