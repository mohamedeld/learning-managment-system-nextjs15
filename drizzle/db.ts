import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
export const db = drizzle({
  schema,
  connection: {
    host: "localhost",
    port: 5432,
    database: "lms",
    user: "postgres",
    password: process.env.DB_PASSWORD,
  },
});
