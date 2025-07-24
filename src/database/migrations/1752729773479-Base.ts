import { MigrationInterface, QueryRunner } from 'typeorm';

export class Base1752729773479 implements MigrationInterface {
  name = 'Base1752729773479';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_97d8fa57594e8632884e7e70b47\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_97d8fa57594e8632884e7e70b47\` FOREIGN KEY (\`productLineId\`) REFERENCES \`product_line\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_97d8fa57594e8632884e7e70b47\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_97d8fa57594e8632884e7e70b47\` FOREIGN KEY (\`productLineId\`) REFERENCES \`product_line\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
