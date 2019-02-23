import { createConnection } from "typeorm";
import config from "config";

export const db = createConnection(config.get("database"));
