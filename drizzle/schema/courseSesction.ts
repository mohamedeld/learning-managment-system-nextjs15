import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseTable } from "./course";

export const courseSectionStatus = ["public","private"] as const;
export type CourseSestionStatus = (typeof courseSectionStatus)[number];
export const courseSectionsEnum = pgEnum("course_section_status",courseSectionStatus)
export const CourseSectionTable = pgTable("courseSections",{
    id,
    name:text().notNull(),
    status:courseSectionsEnum().notNull().default("private"),
    order:integer().notNull(),
    courseId:uuid().notNull().references(()=> CourseTable.id,{onDelete:"cascade"}),
    createdAt,
    updatedAt
})