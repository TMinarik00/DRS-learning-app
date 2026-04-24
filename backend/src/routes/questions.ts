import { Router } from 'express'
import { getAll, getOne } from '../controllers/questions.controller'
import { authenticate } from '../middleware/auth'

const router = Router()

router.get('/', authenticate, getAll)
router.get('/:id', authenticate, getOne)

export default router
