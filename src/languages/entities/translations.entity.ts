import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import {
  ActionsTitle,
  QuestionAction,
  QuestionType,
} from "types.common/lessons.types";
import { Language } from "./language.entity";

@Entity()
export class HeaderTranslation {
  @PrimaryColumn()
  code: string;

  @ManyToOne((type) => Language, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "languageCode" })
  language: Language;

  @Column({
    type: "enum",
    enum: ActionsTitle,
  })
  action: ActionsTitle;

  @Column()
  name: string;
}

@Entity()
export class TitleTranslation {
  @PrimaryColumn()
  code: string;

  @ManyToOne((type) => Language, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "languageCode" })
  language: Language;

  @Column({
    type: "enum",
    enum: QuestionType,
  })
  type: QuestionType;

  @Column()
  name: string;
}
