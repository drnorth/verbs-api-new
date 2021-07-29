import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Language {
  @PrimaryColumn()
  code: string;
  
  @Column()
  title: string;
}
