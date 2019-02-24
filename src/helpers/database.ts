import { tryCatch, TaskEither } from "fp-ts/lib/TaskEither";
import { getManager } from "typeorm";

import { IError } from "types/error";

export interface Type<T> extends Function {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}

export const save = <A>(entity: Type<A>): ((data: A) => TaskEither<IError[], A>) => (data: A) =>
  tryCatch(
    async () => {
      const repository = getManager().getRepository(entity);
      return repository.save(data);
    },
    reason => [new Error(String(reason))]
  );
export const find = <A>(entity: Type<A>): (() => TaskEither<IError[], A[]>) => () =>
  tryCatch(
    async () => {
      const repository = getManager().getRepository(entity);
      return repository.find();
    },
    reason => [new Error(String(reason))]
  );

export const findById = <A>(entity: Type<A>): ((id: string) => TaskEither<IError[], A>) => (id: string) =>
  tryCatch(
    async () => {
      const repository = getManager().getRepository(entity);
      return repository.findOneOrFail(id);
    },
    reason => [reason as IError]
  );
