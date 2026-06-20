import { FastifyRequest, FastifyReply } from 'fastify'
import { verify } from 'jsonwebtoken'


export type requireAuth = FastifyRequest & {
  user?: { sub: string; username: string }
}

export function requireAuth(request: requireAuth, reply: FastifyReply) {
  const header = request.headers.authorization
  if (!header) return reply.code(401).send({ error: 'Missing Authorization header' })

  const [type, token] = header.split(' ')
  if (type !== 'Bearer' || !token) return reply.code(401).send({ error: 'Invalid Authorization header' })

  try {
    const secret = process.env.JWT_SECRET
    if (!secret) return reply.code(500).send({ error: 'JWT_SECRET not configured' })

    const payload = verify(token, secret) as { sub: string; username: string }

    request.user = { sub: payload.sub, username: payload.username }
  } catch {
    return reply.code(401).send({ error: 'Invalid or expired token' })
  }
}

