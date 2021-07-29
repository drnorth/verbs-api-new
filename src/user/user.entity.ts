import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Roles } from "types.common/roles.types";
import bcrypt from "bcrypt";
import { Language } from "languages/entities/language.entity";

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

  @Column({ default: "", select: false })
  password?: string;

  @Column({ default: "", select: false })
  salt?: string;

  @Column({ default: "RU-ru" })
  lang?: string;

  @Column({ default: false })
  premium?: boolean;

  @Column({ default: false })
  isAutoCreated?: boolean;

  @Column({
    type: "enum",
    enum: Roles,
    default: Roles.USER,
  })
  role: Roles;

  @Column()
  languageCode: string;

  @ManyToOne((type) => Language, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "languageCode" })
  language: Language;

  isPasswordMatch(password: string) {
    return bcrypt.compare(password, this.password as string);
  }
}
