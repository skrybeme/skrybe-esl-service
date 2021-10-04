import dotenv from 'dotenv';

dotenv.config();

const ALLOWED_ORIGIN = process.env.SERVER_ALLOWED_ORIGIN;
const PORT = process.env.SERVER_PORT;

const server = {
  allowedOrigin: ALLOWED_ORIGIN,
  port: PORT
};

export const config = {
  server
};
