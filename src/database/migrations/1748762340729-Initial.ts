import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1748762340729 implements MigrationInterface {
  name = 'Initial1748762340729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_line\` ADD \`name\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_line\` ADD \`description\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`name\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`description\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`quantityInstock\` int NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` ADD \`price\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`review\` ADD \`rating\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD \`reviewText\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`orderDate\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`status\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`totalAmount\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_detail\` ADD \`quantity\` int NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`cart\` ADD \`quantity\` int NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`quantity\``);
    await queryRunner.query(
      `ALTER TABLE \`order_detail\` DROP COLUMN \`quantity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP COLUMN \`totalAmount\``,
    );
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`status\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`orderDate\``);
    await queryRunner.query(
      `ALTER TABLE \`review\` DROP COLUMN \`reviewText\``,
    );
    await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`rating\``);
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`quantityInstock\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`product_line\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_line\` DROP COLUMN \`name\``,
    );
  }
}
