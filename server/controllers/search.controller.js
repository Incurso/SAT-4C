import { logger } from '../utils/logger.js'
import { searchService as service } from '../services/index.js'

export const get = async (req, res) => {
  const { pattern } = req.params

  service.get(pattern)
    .then((result) => {
      logger(req, { type: 'INFO', action: 'SEARCH', message: pattern })

      return res.status(200).json(result)
    })
    .catch((err) => {
      logger(req, { type: 'ERROR', action: 'SEARCH', message: err.message })

      return res.status(404).json({ message: err.message })
    })
}

export default {
  get
}
