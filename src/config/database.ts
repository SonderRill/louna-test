import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || '';

export const sql = postgres(connectionString, {
  max: Number(process.env.DB_MAX_CONNECTIONS) || 10,
  idle_timeout: Number(process.env.DB_IDLE_TIMEOUT) || 20,
  connect_timeout: Number(process.env.DB_CONNECT_TIMEOUT) || 10,
});

