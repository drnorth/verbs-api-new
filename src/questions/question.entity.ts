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

  @Column()
  verb: string;
}
