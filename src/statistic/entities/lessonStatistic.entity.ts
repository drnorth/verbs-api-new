import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { Lesson } from "lessons/entities/lesson.entity";
import { User } from "user/user.entity";

@Entity()
export class LessonStatistic {
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

  @Column()
  result: Number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date;
}
