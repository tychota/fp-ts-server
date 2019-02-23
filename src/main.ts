import "reflect-metadata";

import Koa from "koa";
import config from "config";
import { registerMiddlewares } from "middlewares";
import { registerRoutes } from "./routes";

import "./db";

const app = new Koa();

registerMiddlewares(app);
registerRoutes(app);

app.on("error", (err, ctx) => {
  console.warn(err, ctx);
});

const port = config.get("server.port");
const server = app.listen(port);
console.log("Server running on port " + port);

export default server;
