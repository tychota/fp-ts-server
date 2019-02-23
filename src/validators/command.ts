import * as t from "io-ts";
import { date } from "io-ts-types";

import { UserV } from "validators/user";
import { ProductV } from "validators/product";

const CommandItemV = t.type({
  product: ProductV,
  quantity: t.Int
});
type TCommandItem = t.TypeOf<typeof CommandItemV>;

const CommandCommonV = t.type({
  user: UserV,
  commandDate: date,
  items: t.array(CommandItemV)
});
const CommandOngoingV = t.type({
  deliveryDate: t.null,
  status: t.literal("ONGOING")
});
const CommandFinishedV = t.type({
  deliveryDate: date,
  status: t.literal("FINISHED")
});

export const CommandV = t.intersection([CommandCommonV, t.taggedUnion("status", [CommandOngoingV, CommandFinishedV])]);
export type TCommand = t.TypeOf<typeof CommandV>;
