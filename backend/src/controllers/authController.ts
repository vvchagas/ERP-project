import { FastifyRequest, FastifyReply } from 'fastify'
import { sign } from 'jsonwebtoken'

import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

export const loginController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const body = loginSchema.parse(request.body)

    const expectedUsername = process.env.JWT_USER
    const expectedPassword = process.env.JWT_PASS
    if (!expectedUsername || !expectedPassword) {
      return reply.code(500).send({ error: 'Auth env not configured (JWT_USER/JWT_PASS)' })
    }

    if (body.username !== expectedUsername || body.password !== expectedPassword) {
      return reply.code(401).send({ error: 'Invalid credentials' })
    }

    const secret = process.env.JWT_SECRET
    const ttl = process.env.JWT_TTL ?? '1h'
    if (!secret) return reply.code(500).send({ error: 'JWT_SECRET not configured' })

    const token = sign({ username: body.username }, secret, {

      subject: body.username,
      expiresIn: ttl,
    })

    return reply.code(200).send({ token })
  } catch (err) {
    return reply.code(400).send({ error: 'Invalid request body' })
  }
}

export const meController = async (request: any, reply: FastifyReply) => {
  return reply.code(200).send({ user: request.user })
}

