import { IO } from "fp-ts/lib/IO";
import crypto from "crypto";

export const random: IO<string> = new IO(() => crypto.randomBytes(20).toString("hex"));
