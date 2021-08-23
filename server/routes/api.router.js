import { Router } from 'express'
import passport from 'passport'
import { lineController, searchController } from '../controllers/index.js'

const router = Router()

router.get('/lines/:pattern', passport.authenticate(['jwt'], { session: false, failWithError: true }), lineController.get, lineController.errorResponse)
router.put('/lines/:pattern', passport.authenticate(['jwt'], { session: false, failWithError: true }), lineController.put, lineController.errorResponse)

router.get('/search/:pattern', passport.authenticate(['jwt'], { session: false, failWithError: true }), searchController.get, searchController.errorResponse)

router.get('*', passport.authenticate(['jwt'], { session: false, failWithError: true }), (req, res) => { res.status(404).json({ message: 'Resource not found!' }) })

export default router
