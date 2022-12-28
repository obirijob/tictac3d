/** @format */
import axios from 'axios'
const constants = require('../helpers/constants')

export default async function postRequest(url, body) {
  try {
    const req = await axios.post(`${constants.url}${url}`, body)
    return req.data
  } catch (ex) {
    console.log(ex)
    throw new Error(ex.response.data.error || ex.message)
  }
}
