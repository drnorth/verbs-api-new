import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
  Column,
} from "typeorm";
import { User } from "user/user.entity";

@Entity()
export class TestStatistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lessonId: number;

  @ManyToOne((type) => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @RelationId((statistic: TestStatistics) => statistic.user)
  userId: number;

  @Column()
  status: boolean;

  @Column()
  correct: number;

  @Column()
  total: number;
}
