import { Response } from 'express'
import { PrismaClient, Category } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export async function startSession(req: AuthRequest, res: Response) {
  const { category } = req.body

  const allQuizQuestions = await prisma.quizQuestion.findMany({
    where: category ? { question: { category: category as Category } } : undefined,
    include: {
      options: true,
      question: { select: { title: true, category: true, number: true } },
    },
  })

  if (allQuizQuestions.length === 0) {
    return res.status(400).json({ error: 'Nema dostupnih pitanja za odabranu kategoriju' })
  }

  const selected = shuffle(allQuizQuestions).slice(0, Math.min(10, allQuizQuestions.length))

  const session = await prisma.quizSession.create({
    data: {
      userId: req.userId!,
      totalQuestions: selected.length,
      category: category as Category | undefined,
    },
  })

  return res.json({
    sessionId: session.id,
    totalQuestions: selected.length,
    questions: selected.map((q) => ({
      id: q.id,
      text: q.text,
      questionTitle: q.question.title,
      questionCategory: q.question.category,
      questionNumber: q.question.number,
      options: shuffle(q.options.map((o) => ({ id: o.id, text: o.text }))),
    })),
  })
}

export async function submitAnswer(req: AuthRequest, res: Response) {
  const sessionId = req.params.id
  const { quizQuestionId, selectedOptionId, timeSpent } = req.body

  const session = await prisma.quizSession.findUnique({ where: { id: sessionId } })
  if (!session || session.userId !== req.userId) {
    return res.status(403).json({ error: 'Nevažeća sesija' })
  }

  const option = selectedOptionId
    ? await prisma.quizOption.findUnique({ where: { id: selectedOptionId } })
    : null
  const isCorrect = option?.isCorrect ?? false

  await prisma.sessionAnswer.create({
    data: {
      sessionId,
      quizQuestionId,
      selectedId: selectedOptionId ?? null,
      isCorrect,
      timeSpent: timeSpent ?? 0,
    },
  })

  const correctOption = await prisma.quizOption.findFirst({
    where: { quizQuestionId, isCorrect: true },
  })

  return res.json({ isCorrect, correctOptionId: correctOption?.id })
}

export async function completeSession(req: AuthRequest, res: Response) {
  const sessionId = req.params.id
  const { timeTaken } = req.body

  const session = await prisma.quizSession.findUnique({
    where: { id: sessionId },
    include: { answers: true },
  })
  if (!session || session.userId !== req.userId) {
    return res.status(403).json({ error: 'Nevažeća sesija' })
  }
  if (session.completedAt) {
    return res.status(400).json({ error: 'Sesija je već završena' })
  }

  const correct = session.answers.filter((a) => a.isCorrect).length
  const total = session.totalQuestions

  let xpEarned = correct * 100
  if (correct === total) xpEarned += 300
  xpEarned += 50
  const fastAnswers = session.answers.filter((a) => a.isCorrect && a.timeSpent < 10).length
  xpEarned += fastAnswers * 50

  await prisma.quizSession.update({
    where: { id: sessionId },
    data: { score: correct, timeTaken: timeTaken ?? 0, xpEarned, completedAt: new Date() },
  })

  await prisma.user.update({
    where: { id: req.userId! },
    data: { xp: { increment: xpEarned } },
  })

  // Update per-question progress
  for (const answer of session.answers) {
    const qq = await prisma.quizQuestion.findUnique({ where: { id: answer.quizQuestionId } })
    if (!qq) continue

    const existing = await prisma.userProgress.findUnique({
      where: { userId_questionId: { userId: req.userId!, questionId: qq.questionId } },
    })

    if (existing) {
      const newCorrect = existing.correctCount + (answer.isCorrect ? 1 : 0)
      const newTotal = existing.totalAttempts + 1
      const mastery = Math.min(5, Math.floor((newCorrect / newTotal) * 5) + (answer.isCorrect ? 1 : 0))
      await prisma.userProgress.update({
        where: { id: existing.id },
        data: {
          correctCount: newCorrect,
          totalAttempts: newTotal,
          masteryLevel: mastery,
          lastAttempted: new Date(),
        },
      })
    } else {
      await prisma.userProgress.create({
        data: {
          userId: req.userId!,
          questionId: qq.questionId,
          correctCount: answer.isCorrect ? 1 : 0,
          totalAttempts: 1,
          masteryLevel: answer.isCorrect ? 1 : 0,
        },
      })
    }
  }

  return res.json({ score: correct, totalQuestions: total, xpEarned, isPerfect: correct === total })
}

export async function getSessions(req: AuthRequest, res: Response) {
  const sessions = await prisma.quizSession.findMany({
    where: { userId: req.userId!, completedAt: { not: null } },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })
  return res.json({ sessions })
}
