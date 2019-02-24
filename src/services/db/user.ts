/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either } from "fp-ts/lib/Either";
import { TaskEither, fromEither } from "fp-ts/lib/TaskEither";

import { UserV } from "validators/user";
import { createUserEntityFromData, User } from "entities/user";
import { IError } from "types/error";
import { save, find, findById } from "helpers/database";
import { uuid } from "io-ts-types";

export class UserDBService {
  public static create(data: any): TaskEither<IError[], User> {
    const parsedData = UserV.decode(data) as Either<IError[], User>;
    return fromEither(parsedData)
      .map(createUserEntityFromData)
      .chain(save(User));
  }
  public static find(): TaskEither<IError[], User[]> {
    return find(User)();
  }
  public static findById(data: any): TaskEither<IError[], User> {
    const parsedData = uuid.decode(data) as Either<IError[], string>;
    return fromEither(parsedData).chain(findById(User));
  }
}
