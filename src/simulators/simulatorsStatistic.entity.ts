import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { Verb } from "verbs/verb.entity";
import { User } from "user/user.entity";

@Entity()
export class SimulatorsStatistic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Verb, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "verbId" })
  verb: Verb;

  @ManyToOne((type) => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ default: 0 })
  correct: number;

  @Column({ default: 0 })
  count: number;
}
