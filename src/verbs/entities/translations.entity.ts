import { Language } from "languages/entities/language.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Verb } from "./verb.entity";

@Entity()
export class VerbTranslation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => Verb, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "verbId" })
  verb: Verb;

  @ManyToOne((type) => Language, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "languageCode" })
  language: Language;

  @Column()
  translation: string;
}
