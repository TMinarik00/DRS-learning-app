import { Router } from 'express'
import { getProfile, updateProfile, changePassword, getProgress } from '../controllers/user.controller'
import { authenticate } from '../middleware/auth'

const router = Router()

router.get('/profile', authenticate, getProfile)
router.put('/profile', authenticate, updateProfile)
router.put('/password', authenticate, changePassword)
router.get('/progress', authenticate, getProgress)

export default router
