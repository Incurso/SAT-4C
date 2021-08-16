import { Router } from 'express'
import passport from 'passport'
import { lineController, searchController } from '../controllers/index.js'

const router = Router()

router.get('/lines/:pattern', passport.authenticate(['jwt'], { session: false, failWithError: true }), lineController.get)
router.put('/lines/:pattern', passport.authenticate(['jwt'], { session: false, failWithError: true }), lineController.put)

router.get('/search/:pattern', passport.authenticate(['jwt'], { session: false, failWithError: true }), searchController.get)

router.get('*', passport.authenticate(['jwt'], { session: false, failWithError: true }), (req, res) => { res.status(404).json({ message: 'Resource not found!' }) })

export default router
