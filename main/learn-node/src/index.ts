import { createServer } from 'http';
import { controller } from './controller';

const port = process.env.PORT || 8181;

const server = createServer();

server.addListener('request', controller);

server.listen(port, () => console.log(`listening port: ${port}`));
