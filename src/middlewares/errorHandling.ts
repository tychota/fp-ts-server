import { BaseContext } from "koa";

export const errorHandlingMiddleware = async (ctx: BaseContext, next: Function): Promise<void> => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
};
