import { BaseContext } from "koa";

export const handleSuccess = <T>(ctx: BaseContext): ((result: T) => void) => (result: T) => {
  if (result === null || result === undefined) {
    ctx.status = 204;
  } else {
    ctx.status = 200;
    ctx.body = result;
  }
};
