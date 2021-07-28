import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableIndex,
} from "typeorm";

export class CreateVerbs1627491866254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: "verb",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid",
        },
        {
          name: "inf",
          type: "varchar",
          length: "36",
        },
        {
          name: "simple",
          type: "varchar",
          length: "36",
        },
        {
          name: "part",
          type: "varchar",
          length: "36",
        },
        {
          name: "translations",
          type: "varchar",
          length: "36",
        },
        {
          name: "difficult",
          type: "varchar",
          length: "20",
        },
        {
          name: "coeff",
          type: "int",
          isNullable: true,
        },
      ],
    });

    await queryRunner.createIndex(
      "verb",
      new TableIndex({
        name: "IDX_QUESTION_NAME",
        columnNames: ["id"],
      })
    );

    await queryRunner.addColumn(
      "verb",
      new TableColumn({
        name: "coeff",
        type: "int",
        isNullable: true,
      })
    );

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("verb");
  }
}
