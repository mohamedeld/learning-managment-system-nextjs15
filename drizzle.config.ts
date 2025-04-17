import {defineConfig} from "drizzle-kit"

export default defineConfig({
    out:"./drizzle/migrations",
    schema:"./drizzle/schema.ts",
    strict:true,
    verbose:true,
    dbCredentials:{
        host:"localhost",
        port:5432,
        database:"lms",
        user:"postgres",
        password:process.env.DB_PASSWORD,
        ssl:false
    },

})