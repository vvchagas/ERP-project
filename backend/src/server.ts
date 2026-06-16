import fastify from 'fastify';

const app = fastify();

app.get('/health', async () => {
  return { status: 'ERP Backend Online' };
});

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 ERP Server rodando em ${address}`);
});