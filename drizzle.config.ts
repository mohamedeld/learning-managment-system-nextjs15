import {defineConfig} from "drizzle-kit"
import { env } from "./data/env/server"

export default defineConfig({
    out:"./drizzle/migrations",
    schema:"./drizzle/schema.ts",
    strict:true,
    verbose:true,
    dialect:"postgresql",
    dbCredentials:{
        host:"localhost",
        port:5432,
        database:"lms",
        user:"postgres",
        password:env.DB_PASSWORD,
        ssl:false
    },
})