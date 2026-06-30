import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Puxa a string de conexão do seu .env
const connectionString = process.env.DATABASE_URL;

// 2. Cria o Pool de conexões do PostgreSQL
const pool = new Pool({ connectionString });

// 3. Cria o adaptador
const adapter = new PrismaPg(pool);

// 4. Instancia o Prisma com o adaptador (Isso resolve o erro PrismaClientInitializationError!)
export const prisma = new PrismaClient({ adapter });