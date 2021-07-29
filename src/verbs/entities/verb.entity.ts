import { Question } from "questions/question.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Difficult } from "types.common/verbs.types";
import { VerbTranslation } from "./translations.entity";

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

  @Column({
    type: "enum",
    enum: Difficult,
    default: Difficult.EASY,
  })
  difficult: Difficult;

  @OneToMany(() => VerbTranslation, (verbTranslation) => verbTranslation.verb)
  translations: VerbTranslation[];

  @OneToMany((type) => Question, (question) => question.verb)
  questions: Question[];

  @Column({ select: false, nullable: true })
  coeff: number;
}
