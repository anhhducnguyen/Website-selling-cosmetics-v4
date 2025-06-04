import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialRelationShip1748762816517 implements MigrationInterface {
  name = 'InitialRelationShip1748762816517';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_image\` ADD \`path\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_image\` DROP COLUMN \`path\``,
    );
  }
}
