import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Difficult } from "types.common/verbs.types";

@Entity()
export class Verb {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  inf: string;

  @Column()
  simple: string;

  @Column()
  part: string;

  @Column()
  translations: string;

  @Column({
    type: "enum",
    enum: Difficult,
    default: Difficult.EASY,
  })
  difficult: Difficult;
}
