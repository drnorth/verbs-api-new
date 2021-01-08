import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "user/user.entity";

export enum TypesToken {
  REFRESH = "REFRESH",
  RESET_PASSWORD = "RESET_PASSWORD",
}

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  token: string;

  @ManyToOne((type) => User, {
    onDelete: "CASCADE",
  })
  user: User;

  @Column({
    type: "enum",
    enum: TypesToken,
    default: TypesToken.REFRESH,
  })
  type: TypesToken;

  @Column()
  expires: Date;

  @Column({ default: false })
  blacklisted: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt?: Date;
}
