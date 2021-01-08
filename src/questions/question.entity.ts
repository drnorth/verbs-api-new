import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  RelationId,
} from "typeorm";
import { QuestionType, AnswerType } from "types.common/lessons.types";
import { Lesson } from "../lessons/lesson.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Lesson, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "lessonId" })
  lesson: Lesson;

  @RelationId((question: Question) => question.lesson)
  lessonId: number;

  @Column()
  type: QuestionType;

  @Column()
  answerType: AnswerType;

  @Column()
  verb: string;
}
