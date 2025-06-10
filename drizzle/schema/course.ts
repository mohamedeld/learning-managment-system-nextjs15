import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseProductTable } from "./courseProduct";
export const CourseTable = pgTable("courses",{
    id,
    name:text().notNull(),
    description:text().notNull(),
    createdAt,
    updatedAt,
})

export const CourseRelationship = relations(CourseTable,({many})=>({
    courseProducts:many(CourseProductTable)
    // Define relationships here if needed, e.g.:
    // students: many(StudentTable),
    // instructors: many(InstructorTable),
}))