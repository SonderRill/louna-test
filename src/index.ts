import Fastify from 'fastify';
import { skinportRoutes } from './routes/skinport.routes';
import { purchaseRoutes } from './routes/purchase.routes';
import { sql } from './config/database';
import { redis } from './config/redis';

const fastify = Fastify({
  logger: true,
});

// Регистрируем роуты
fastify.register(skinportRoutes);
fastify.register(purchaseRoutes);

// Graceful shutdown
const shutdown = async () => {
  try {
    await fastify.close();
    await sql.end();
    await redis.quit();
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || '0.0.0.0';
    
    await fastify.listen({ port, host });
    console.log(`Server listening on ${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

