import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()

export async function getAll(req: AuthRequest, res: Response) {
  const { category } = req.query

  const questions = await prisma.question.findMany({
    where: category ? { category: category as any } : undefined,
    orderBy: { number: 'asc' },
    include: {
      userProgress: {
        where: { userId: req.userId! },
      },
      _count: { select: { quizQuestions: true } },
    },
  })

  return res.json({
    questions: questions.map((q) => ({
      id: q.id,
      number: q.number,
      title: q.title,
      content: q.content,
      category: q.category,
      keyConcepts: q.keyConcepts,
      quizCount: q._count.quizQuestions,
      progress: q.userProgress[0] ?? null,
    })),
  })
}

export async function getOne(req: AuthRequest, res: Response) {
  const id = parseInt(req.params.id)
  const question = await prisma.question.findUnique({
    where: { id },
    include: {
      userProgress: { where: { userId: req.userId! } },
      _count: { select: { quizQuestions: true } },
    },
  })
  if (!question) return res.status(404).json({ error: 'Pitanje nije pronađeno' })

  return res.json({
    id: question.id,
    number: question.number,
    title: question.title,
    content: question.content,
    category: question.category,
    keyConcepts: question.keyConcepts,
    quizCount: question._count.quizQuestions,
    progress: question.userProgress[0] ?? null,
  })
}
