import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Language } from "languages/entities/language.entity";
import languagesData from "../data/languages";

export default class CreateLang implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Language)
      .values(languagesData)
      .execute();
  }
}
