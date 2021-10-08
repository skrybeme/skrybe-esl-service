import dotenv from 'dotenv';

dotenv.config();

const ALLOWED_ORIGIN = process.env.SERVER_ALLOWED_ORIGIN;
const MONGO_CONNECTION_QUERY = process.env.MONGO_CONNECTION_QUERY;
const PORT = process.env.SERVER_PORT;

const mongo = {
  connectionQuery: MONGO_CONNECTION_QUERY
};

const server = {
  allowedOrigin: ALLOWED_ORIGIN,
  port: PORT
};

export const config = {
  mongo,
  server
};
