import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceId: string;

  @Column({ default: "" })
  name?: string;

  @Column({ default: "" })
  email?: string;

  @Column({ default: "" })
  password?: string;

  @Column({ default: "" })
  salt?: string;

  @Column({ default: "RU-ru" })
  lang?: string;

  @Column({ default: false })
  premium?: boolean;

  @Column({ default: false })
  isAutoCreated?: boolean;

  isPasswordMatch(password: string) {
    return bcrypt.compare(password, this.password as string);
  }
}
