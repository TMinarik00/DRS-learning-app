import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import questionRoutes from './routes/questions'
import quizRoutes from './routes/quiz'
import leaderboardRoutes from './routes/leaderboard'
import userRoutes from './routes/user'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/user', userRoutes)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.use(errorHandler)

export default app
