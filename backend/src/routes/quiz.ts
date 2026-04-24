import { Router } from 'express'
import { startSession, submitAnswer, completeSession, getSessions } from '../controllers/quiz.controller'
import { authenticate } from '../middleware/auth'

const router = Router()

router.post('/start', authenticate, startSession)
router.post('/:id/answer', authenticate, submitAnswer)
router.post('/:id/complete', authenticate, completeSession)
router.get('/sessions', authenticate, getSessions)

export default router
