import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLang1627552534767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: "language",
      columns: [
        {
          name: "code",
          type: "varchar",
          length: "36",
          isPrimary: true,
        },
        {
          name: "title",
          type: "varchar",
          length: "36",
        },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("language");
  }
}
