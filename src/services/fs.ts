import { taskify, TaskEither } from "fp-ts/lib/TaskEither";
import fs, { PathLike } from "fs";
import path from "path";
import { IError } from "types/error";

type TFSOption = string | number | fs.MakeDirectoryOptions | null | undefined;

export class FileSystemService {
  public static allocateDir(uid: string): TaskEither<IError[], void> {
    const pathToUserDirectory = path.join("./documents", uid);
    return taskify<PathLike, TFSOption, NodeJS.ErrnoException, void>(fs.mkdir)(pathToUserDirectory, null).mapLeft(
      err => [err]
    );
  }
}
