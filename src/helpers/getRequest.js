/** @format */
import axios from 'axios'
const constants = require('../helpers/constants')

export default async function getRequest(url) {
  try {
    const req = await axios.get(`${constants.url}${url}`)
    return req.data
  } catch (ex) {
    throw new Error(ex.response.data.error || ex.message)
  }
}
