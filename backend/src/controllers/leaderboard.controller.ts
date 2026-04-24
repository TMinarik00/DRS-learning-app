import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()

export async function getLeaderboard(req: AuthRequest, res: Response) {
  const users = await prisma.user.findMany({
    orderBy: { xp: 'desc' },
    take: 20,
    select: { id: true, username: true, xp: true, streak: true, avatarColor: true, createdAt: true },
  })

  const ranked = users.map((u, i) => ({ rank: i + 1, ...u }))
  const myRank = ranked.findIndex((u) => u.id === req.userId) + 1

  return res.json({ leaderboard: ranked, myRank: myRank || null })
}
