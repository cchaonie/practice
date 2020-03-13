const { createServer } = require( 'http');
const { controller } = require('./controller');

const port = process.env.PORT || 8181;

const server = createServer();

server.on('request', controller);

server.listen(port, () => console.log(`listening port: ${port}`));
