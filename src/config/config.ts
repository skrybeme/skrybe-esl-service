import dotenv from 'dotenv';

dotenv.config();

const ALLOWED_ORIGIN = process.env.SERVER_ALLOWED_ORIGIN;
const MONGO_CONNECTION_QUERY = process.env.MONGO_CONNECTION_QUERY;
const PORT = process.env.SERVER_PORT;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_MESSAGE_FROM = process.env.SENDGRID_MESSAGE_FROM;

const mongo = {
  connectionQuery: MONGO_CONNECTION_QUERY
};

const sendgrid = {
  apiKey: SENDGRID_API_KEY,
  messageFrom: SENDGRID_MESSAGE_FROM
}

const server = {
  allowedOrigin: ALLOWED_ORIGIN,
  port: PORT
};

export const config = {
  mongo,
  sendgrid,
  server
};
