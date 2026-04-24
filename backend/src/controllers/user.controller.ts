import { Response } from 'express'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()

export async function getProfile(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, username: true, email: true, xp: true, streak: true, avatarColor: true, createdAt: true },
  })
  if (!user) return res.status(404).json({ error: 'Korisnik nije pronađen' })

  const totalSessions = await prisma.quizSession.count({
    where: { userId: req.userId!, completedAt: { not: null } },
  })
  const bestSession = await prisma.quizSession.findFirst({
    where: { userId: req.userId!, completedAt: { not: null } },
    orderBy: { score: 'desc' },
  })
  const masteredCount = await prisma.userProgress.count({
    where: { userId: req.userId!, masteryLevel: { gte: 3 } },
  })

  return res.json({ user, stats: { totalSessions, bestScore: bestSession?.score ?? 0, masteredCount } })
}

export async function updateProfile(req: AuthRequest, res: Response) {
  const { username, email, avatarColor } = req.body

  if (username) {
    const exists = await prisma.user.findFirst({ where: { username, NOT: { id: req.userId } } })
    if (exists) return res.status(409).json({ error: 'Korisničko ime već postoji' })
  }
  if (email) {
    const exists = await prisma.user.findFirst({ where: { email, NOT: { id: req.userId } } })
    if (exists) return res.status(409).json({ error: 'Email već postoji' })
  }

  const user = await prisma.user.update({
    where: { id: req.userId },
    data: { ...(username && { username }), ...(email && { email }), ...(avatarColor && { avatarColor }) },
    select: { id: true, username: true, email: true, xp: true, streak: true, avatarColor: true, createdAt: true },
  })
  return res.json({ user })
}

export async function changePassword(req: AuthRequest, res: Response) {
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Sva polja su obavezna' })
  if (newPassword.length < 6) return res.status(400).json({ error: 'Nova lozinka mora imati najmanje 6 znakova' })

  const user = await prisma.user.findUnique({ where: { id: req.userId } })
  if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
    return res.status(401).json({ error: 'Trenutna lozinka je neispravna' })
  }

  const passwordHash = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({ where: { id: req.userId }, data: { passwordHash } })
  return res.json({ message: 'Lozinka je promijenjena' })
}

export async function getProgress(req: AuthRequest, res: Response) {
  const progress = await prisma.userProgress.findMany({
    where: { userId: req.userId! },
    include: { question: { select: { number: true, title: true, category: true } } },
  })
  return res.json({ progress })
}
