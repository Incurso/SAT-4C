import { Router } from 'express'
import passport from 'passport'
import { authController } from '../controllers/index.js'

const router = Router()

router.post('/', passport.authenticate(['ldap'], { session: false, failWithError: true }), authController.generateJWT, authController.errorResponse)

router.get('/', passport.authenticate(['jwt'], { session: false, failWithError: true }), authController.getUserFromJWT, authController.errorResponse)

export default router
