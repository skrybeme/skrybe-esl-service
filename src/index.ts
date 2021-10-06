import { createServer } from './http/server';
import { config } from './config/config';
import { logger } from './infra';

const server = createServer();

server.listen(config.server.port, () => {
  logger.log(`Server running on port ${config.server.port}`);
});
