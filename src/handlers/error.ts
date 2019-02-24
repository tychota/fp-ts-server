import { BaseContext } from "koa";
import { ValidationError, getFunctionName, Context } from "io-ts";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";
import { IError } from "types/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stringify(v: any): string {
  if (typeof v === "function") {
    return getFunctionName(v);
  }
  if (typeof v === "number" && !isFinite(v)) {
    if (isNaN(v)) {
      return "NaN";
    }
    return v > 0 ? "Infinity" : "-Infinity";
  }
  return JSON.stringify(v);
}

function getContextPath(context: Context): string {
  return context.map(({ key, type }) => `${key}: ${type.name}`).join("/");
}

function getMessage(e: ValidationError): string {
  return e.message !== undefined
    ? e.message
    : `Invalid value ${stringify(e.value)} supplied to ${getContextPath(e.context)}`;
}

export const handleError = (ctx: BaseContext): ((errors: IError[]) => void) => (errors: IError[]) => {
  if (errors.length === 1 && errors[0] instanceof EntityNotFoundError) {
    ctx.status = 404;
    ctx.body = { data: null, errors: errors };
  } else if (errors.some(e => e instanceof Error)) {
    ctx.status = 500;
    ctx.body = { data: null, errors: errors };
  } else {
    ctx.status = 400;
    ctx.body = (errors as ValidationError[]).map(getMessage);
  }
};
