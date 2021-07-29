import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  RelationId,
} from "typeorm";
import { QuestionType, AnswerType } from "types.common/lessons.types";
import { Lesson } from "lessons/entities/lesson.entity";
import { Verb } from "verbs/entities/verb.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Lesson, (lesson) => lesson.questions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "lessonId" })
  lesson: Lesson;

  @RelationId((question: Question) => question.lesson)
  lessonId: number;

  @Column({
    type: "enum",
    enum: QuestionType,
  })
  type: QuestionType;

  @Column({
    type: "enum",
    enum: AnswerType,
  })
  answerType: AnswerType;

  @ManyToOne((type) => Verb, (verb) => verb.questions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "verbId" })
  verb: Verb;

  @RelationId((question: Question) => question.verb)
  verbId: string;
}
