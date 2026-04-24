import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

function sanitize(user: { id: string; username: string; email: string; xp: number; streak: number; avatarColor: string; createdAt: Date }) {
  return { id: user.id, username: user.username, email: user.email, xp: user.xp, streak: user.streak, avatarColor: user.avatarColor, createdAt: user.createdAt }
}

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body
  if (!username || !email || !password) return res.status(400).json({ error: 'Sva polja su obavezna' })
  if (password.length < 6) return res.status(400).json({ error: 'Lozinka mora imati najmanje 6 znakova' })

  const exists = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } })
  if (exists) return res.status(409).json({ error: 'Email ili korisničko ime već postoji' })

  const passwordHash = await bcrypt.hash(password, 10)
  const COLORS = ['#7C3AED', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#EF4444']
  const avatarColor = COLORS[Math.floor(Math.random() * COLORS.length)]

  const user = await prisma.user.create({ data: { username, email, passwordHash, avatarColor } })
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
  return res.status(201).json({ token, user: sanitize(user) })
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email i lozinka su obavezni' })

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Neispravni email ili lozinka' })
  }

  await prisma.user.update({ where: { id: user.id }, data: { lastActive: new Date() } })
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
  return res.json({ token, user: sanitize(user) })
}

export async function me(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: req.userId } })
  if (!user) return res.status(404).json({ error: 'Korisnik nije pronađen' })
  return res.json({ user: sanitize(user) })
}
