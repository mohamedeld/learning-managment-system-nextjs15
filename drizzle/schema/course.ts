import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseProductTable } from "./courseProduct";
import { UserCourseAccessTable } from "./userCourseAccess";
import { LessonTable } from "./lesson";
export const CourseTable = pgTable("courses",{
    id,
    name:text().notNull(),
    description:text().notNull(),
    createdAt,
    updatedAt,
})

export const CourseRelationship = relations(CourseTable,({many})=>({
    courseProducts:many(CourseProductTable),
    userCourseAccesses:many(UserCourseAccessTable),
    lessons:many(LessonTable)
    // Define relationships here if needed, e.g.:
    // students: many(StudentTable),
    // instructors: many(InstructorTable),
}))