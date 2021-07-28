import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Verb } from "../../verbs/verb.entity";
import mockVerb from "../../verbs/mock";

export default class CreateVerbs implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Verb)
      .values(mockVerb)
      .execute();
  }
}
