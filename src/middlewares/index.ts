import Koa from "koa";
import config from "config";

import bodyParser from "koa-bodyparser";
import logger from "koa-logger";

import { errorHandlingMiddleware } from "./errorHandling";

export const registerMiddlewares = (app: Koa): void => {
  config.get("server.logging") && app.use(logger());
  app.use(bodyParser());
  app.use(errorHandlingMiddleware);
};
