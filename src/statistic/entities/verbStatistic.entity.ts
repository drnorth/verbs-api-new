import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { Verb } from "verbs/entities/verb.entity";
import { User } from "user/user.entity";

@Entity()
export class VerbStatistic {
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

  @Column({ default: false })
  correct?: Boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date;
}
