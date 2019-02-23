import Router from "koa-router";
import Koa from "koa";
import { TUser } from "./data/user";

// Main
const mainRouter = new Router();
mainRouter.get("/OK", ctx => {
  ctx.body = "OK";
  ctx.status = 200;
});

// User
const userRouter = new Router({
  prefix: "/users"
});
userRouter.get("/all", async ctx => {
  ctx.body = [
    {
      firstName: "tycho",
      lastName: "tatitscheff",
      birthDate: new Date("16 Sep 1992 00:00:00 GMT"),
      registrationDate: new Date(1550938148128)
    }
  ] as TUser[];
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
