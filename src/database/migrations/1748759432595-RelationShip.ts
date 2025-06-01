import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationShip1748759432595 implements MigrationInterface {
  name = 'RelationShip1748759432595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD \`productId\` varchar(36) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`cart\` ADD \`userId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`cart\` ADD \`productId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_2a11d3c0ea1b2b5b1790f762b9a\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_756f53ab9466eb52a52619ee019\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_371eb56ecc4104c2644711fa85f\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_371eb56ecc4104c2644711fa85f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_756f53ab9466eb52a52619ee019\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_2a11d3c0ea1b2b5b1790f762b9a\``,
    );
    await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`productId\``);
    await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`productId\``);
  }
}
