import t from "io-ts";
import { Newtype } from "newtype-ts";
import { fromNewtype } from "io-ts-types/lib/newtype-ts/fromNewtype";

type Currency = Newtype<"Currency", number>;

export const ProductV = t.type({
  name: t.string,
  description: t.string,
  price: fromNewtype<Currency>(t.Integer)
});
export type TProduct = t.TypeOf<typeof ProductV>;
