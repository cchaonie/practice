/**
 * in development env, webpack should run in watch mode.
 * after compile, server side should run the compiled file for server side, meanwhile, server side need to get
 * the result of client side compile result, then generate script tag for it.
 * 
 * once file change, the server should restart.
 * 
 * q1: do I need a server to supply compile result?
 * for client side, use webpack-dev-middle and a express server, we can supply the compiled bundles;
 * for server side, after webpack compile process finished, we start a node server using the compiled bundles;
 * */ 
import "./hotServer";