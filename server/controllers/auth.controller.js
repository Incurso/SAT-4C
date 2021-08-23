import fs from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'
import yaml from 'js-yaml'
import parseArgs from 'minimist'
import { authService as service } from '../services/index.js'
import { logger } from '../utils/logger.js'

const args = parseArgs(process.argv.slice(2))

// Load config file
const config = yaml.load(fs.readFileSync(path.resolve(args.config || './config/config.yml'), 'utf8'))

/*
const logger = (req, { type = 'INFO', action, message = '' }) => {
  const msg = {
    timestamp: new Date(),
    type,
    action,
    method: req.method,
    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    ip: req.ip,
    user: req.body.username || req.user.username,
    message
  }

  switch (type) {
    case 'ERROR':
      console.error(msg)
      break
    case 'INFO':
      console.info(msg)
      break
    default:
      console.log(msg)
  }
}
*/

export const errorResponse = (err, req, res, next) => {
  if (err) {
    logger(req, { type: 'ERROR', action: 'LOGIN', message: err.message })

    return res.status(401).json(err)
  }
}

export const generateJWT = (req, res, next) => {
  const { user } = req
  logger(req, { action: 'LOGIN', message: `Successful ${user.type} login.` })

  res.json({
    ...user,
    token: jwt.sign(user, config.JWT.SECRET, { expiresIn: config.JWT.EXPIRESIN })
  })
}

export const getUserFromJWT = (req, res, next) => {
  const { user } = req

  res.json({ ...user })
}

export const jwtLogin = (jwtPayload, done) => {
  service.jwtLogin(jwtPayload)
    .then((payload) => {
      console.log('auth.controller/jwtLogin', payload)
      done(null, payload)
    })
    .catch((err) => { done(null, false, err.message) })
}

export const ldapLogin = (username, password, done) => {
  service.ldapLogin({ username, password })
    .then((user) => {
      console.log('auth.controller/ldapLogin', user)
      done(null, user)
    })
    .catch((err) => {
      done({ message: err.message }, false)
    })
}

export const localLogin = (username, password, done) => {
  service.localLogin({ username, password })
    .then((user) => { done(null, user) })
    .catch((err) => { done(null, false, err.message) })
}

export default {
  errorResponse,
  generateJWT,
  getUserFromJWT,
  jwtLogin,
  ldapLogin,
  localLogin
}
