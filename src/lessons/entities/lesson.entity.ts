import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Difficult } from "types.common/verbs.types";
import { QuestionAction } from "types.common/lessons.types";
import { Question } from "questions/question.entity";

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: QuestionAction,
    default: QuestionAction.CHOOSE,
  })
  action: QuestionAction;

  @Column({
    type: "enum",
    enum: Difficult,
    default: Difficult.EASY,
  })
  difficult: Difficult;

  @Column()
  order: number;

  @Column("int", { select: false, nullable: true })
  status?: string;

  @Column("int", { select: false, nullable: true })
  bestAttempt?: number;

  @OneToMany(() => Question, (question) => question.lesson)
  questions: Question[];
}
