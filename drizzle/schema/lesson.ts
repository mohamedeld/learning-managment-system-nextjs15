import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseSectionTable } from "./courseSesction";
import { relations } from "drizzle-orm";
import { UserLessonCompleteTable } from "./userLessonComplete";

export const lessonStatus = ["public","private","preview"] as const;
export type LessonStatus = (typeof lessonStatus)[number];
export const lessonStatusEnum = pgEnum("lesson_status",lessonStatus);

export const LessonTable = pgTable("lessons",{
    id,
    name:text().notNull(),
    description:text(),
    youtubeVideoId:text().notNull(),
    order:integer().notNull(),
    status:lessonStatusEnum().notNull().default("private"),
    sectionId:uuid().notNull().references(()=> CourseSectionTable.id,{
        onDelete:"cascade"
    }),
    createdAt,
    updatedAt
});

export const LessonRelationship = relations(LessonTable,(({one,many})=>({
    section:one(CourseSectionTable,{
        fields:[LessonTable?.sectionId],
        references:[CourseSectionTable.id]
    }),
    userLessonComplete:many(UserLessonCompleteTable)
})))