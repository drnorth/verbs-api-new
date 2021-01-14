import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { Lesson } from "./lesson.entity";
import { User } from "user/user.entity";
import { StatusLesson } from "types.common/lessons.types";

@Entity()
export class OpenedLesson {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Lesson, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "lessonId" })
  lesson: Lesson;

  @ManyToOne((type) => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({
    type: "enum",
    enum: StatusLesson,
    default: StatusLesson.PROGRESS,
  })
  status: StatusLesson;

  @Column({ default: 0 })
  bestAttempt: Number;
}
