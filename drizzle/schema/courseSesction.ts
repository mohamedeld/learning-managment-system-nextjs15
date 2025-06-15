import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseTable } from "./course";
import { relations } from "drizzle-orm";
import { LessonTable } from "./lesson";

export const courseSectionStatus = ["public", "private"] as const;
export type CourseSestionStatus = (typeof courseSectionStatus)[number];
export const courseSectionsEnum = pgEnum(
  "course_section_status",
  courseSectionStatus
);
// course table
export const CourseSectionTable = pgTable("courseSections", {
  id,
  name: text().notNull(),
  status: courseSectionsEnum().notNull().default("private"),
  order: integer().notNull(),
  courseId: uuid()
    .notNull()
    .references(() => CourseTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const CourseSectionRelationship = relations(
  CourseSectionTable,
  ({ one, many }) => ({
    course: one(CourseTable, {
      fields: [CourseSectionTable?.courseId],
      references: [CourseTable?.id],
    }),
    lessons: many(LessonTable),
  })
);
