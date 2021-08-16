import { logger } from '../utils/logger.js'
import { lineService as service } from '../services/index.js'

export const get = async (req, res) => {
  const { pattern } = req.params

  console.log('controller/line', pattern)

  service.get(pattern)
    .then((result) => {
      logger(req, { type: 'INFO', action: 'GET LINE', message: pattern })

      return res.status(200).json(result)
    })
    .catch(({ status, message }) => {
      logger(req, { type: 'ERROR', action: 'GET LINE', message })

      return res.status(status).json({ message })
    })
}

export const put = async (req, res) => {
  const { pattern } = req.params
  const { callForwardAll } = req.body

  console.log('controller/line', pattern, callForwardAll, req.body)

  service.put({ pattern, callForwardAll })
    .then((result) => {
      logger(req, { type: 'INFO', action: 'UPDATE LINE', message: JSON.stringify({ pattern, callForwardAll }) })

      return res.status(200).json(result)
    })
    .catch(({ status, message }) => {
      logger(req, { type: 'ERROR', action: 'UPDATE LINE', message })

      return res.status(status).json({ message })
    })
}

export default {
  get,
  put
}
