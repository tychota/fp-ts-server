import { BaseContext } from "koa";

export const urlMiddleware = async (ctx: BaseContext, next: Function): Promise<void> => {
  // Log the request to the console
  console.log("Url:", ctx.url);
  // Pass the request to the next middleware function
  await next();
};
