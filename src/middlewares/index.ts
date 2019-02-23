import Koa from "koa";
import logger from "koa-logger";
import { errorHandlingMiddleware } from "./errorHandling";

export const registerMiddlewares = (app: Koa): void => {
  app.use(logger());
  app.use(errorHandlingMiddleware);
};
