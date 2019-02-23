import Router from "koa-router";
import Koa from "koa";
import { UserDBService } from "./services/db/user";

import { getConnection } from "typeorm";

import { handleError } from "./handlers/error";
import { handleSuccess } from "./handlers/sucess";

// Main
const mainRouter = new Router();
mainRouter.get("/OK", ctx => {
  const isDatabaseOK = getConnection().isConnected;
  const ok = isDatabaseOK;
  if (ok) {
    ctx.body = "OK";
    ctx.status = 200;
  } else {
    ctx.status = 503;
  }
});
mainRouter.get("/status/db", ctx => {
  ctx.body = getConnection().entityMetadatas.map(a => a.name);
  ctx.status = 200;
});

// User
const userRouter = new Router({
  prefix: "/users"
});
userRouter.get("/all", async ctx => {
  const result = await UserDBService.find().run();
  result.fold(handleError(ctx), handleSuccess(ctx));
});
userRouter.post("/new", async ctx => {
  const result = await UserDBService.create(ctx.request.body).run();
  result.fold(handleError(ctx), handleSuccess(ctx));
});

// Register
const doRegister = (anApp: Koa, aRouter: Router): void => {
  anApp.use(aRouter.routes());
  anApp.use(aRouter.allowedMethods());
};
export const registerRoutes = (app: Koa): void => {
  doRegister(app, mainRouter);
  doRegister(app, userRouter);
};
