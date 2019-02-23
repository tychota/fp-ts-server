import t from "io-ts";
import { date } from "io-ts-types";

export const UserV = t.type({
  firstName: t.string,
  lastName: t.string,
  birthDate: date,
  registrationDate: date
});
export type TUser = t.TypeOf<typeof UserV>;
