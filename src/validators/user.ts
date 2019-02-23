import * as t from "io-ts";
import { DateFromISOString } from "io-ts-types";

export const UserV = t.type({
  firstName: t.string,
  lastName: t.string,
  birthDate: DateFromISOString,
  registrationDate: DateFromISOString
});
export type TUser = t.TypeOf<typeof UserV>;
