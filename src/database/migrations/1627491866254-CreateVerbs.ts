import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Difficult } from "types.common/verbs.types";

export class CreateVerbs1627491866254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: "verb",
      columns: [
        {
          name: "id",
          type: "uuid",
          isUnique: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid",
          default: `uuid_generate_v4()`,
        },
        {
          name: "inf",
          type: "varchar",
          length: "255",
        },
        {
          name: "simple",
          type: "varchar",
          length: "255",
        },
        {
          name: "part",
          type: "varchar",
          length: "255",
        },
        {
          name: "difficult",
          type: "verb_difficult_enum",
          enum: Object.values(Difficult),
          enumName: "difficult",
          default: Difficult.EASY,
        },
        {
          name: "coeff",
          type: "int",
          isNullable: true,
        },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("verb");
  }
}
