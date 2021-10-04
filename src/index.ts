import { createServer } from './http/server';
import { config } from './config/config';

const server = createServer();

server.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});
