import { ValidationError } from "io-ts";
import { QueryFailedError } from "typeorm";

export type IError = ValidationError | QueryFailedError;
