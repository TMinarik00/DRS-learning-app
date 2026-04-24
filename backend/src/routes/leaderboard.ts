import { Router } from 'express'
import { getLeaderboard } from '../controllers/leaderboard.controller'
import { authenticate } from '../middleware/auth'

const router = Router()

router.get('/', authenticate, getLeaderboard)

export default router
