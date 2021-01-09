import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Difficult } from "types.common/verbs.types";
import { QuestionAction } from "types.common/lessons.types";

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
}
