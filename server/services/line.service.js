import AXL from '../utils/cucm-axl.js'

const axl = new AXL()

export const get = (pattern) => {
  return new Promise((resolve, reject) => {
    return axl.get('Line', { pattern: pattern, routePartitionName: 'Internal-Phones' })
      .then((data) => resolve(data))
      .catch((err) => reject(err))
  })
}

export const put = ({ pattern, callForwardAll }) => {
  return new Promise((resolve, reject) => {
    return axl.updateLine({ pattern: pattern, routePartitionName: 'Internal-Phones', callForwardAll: callForwardAll })
      .then((data) => resolve(data))
      .catch((err) => reject(err))
  })
}

export default {
  get,
  put
}
