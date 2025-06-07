import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialRelationDiscount1749118361984
  implements MigrationInterface
{
  name = 'InitialRelationDiscount1749118361984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`discount\` (\`endDate\` datetime NULL, \`startDate\` datetime NULL, \`type\` varchar(255) NULL, \`value\` int NULL, \`name\` varchar(255) NULL, \`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`discount_product_product\` (\`discountId\` varchar(36) NOT NULL, \`productId\` varchar(36) NOT NULL, INDEX \`IDX_02afa8f59360442cd33a342c62\` (\`discountId\`), INDEX \`IDX_e4e80387d36341495ccaa90363\` (\`productId\`), PRIMARY KEY (\`discountId\`, \`productId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`discount_product_product\` ADD CONSTRAINT \`FK_02afa8f59360442cd33a342c623\` FOREIGN KEY (\`discountId\`) REFERENCES \`discount\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`discount_product_product\` ADD CONSTRAINT \`FK_e4e80387d36341495ccaa903635\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`discount_product_product\` DROP FOREIGN KEY \`FK_e4e80387d36341495ccaa903635\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`discount_product_product\` DROP FOREIGN KEY \`FK_02afa8f59360442cd33a342c623\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e4e80387d36341495ccaa90363\` ON \`discount_product_product\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_02afa8f59360442cd33a342c62\` ON \`discount_product_product\``,
    );
    await queryRunner.query(`DROP TABLE \`discount_product_product\``);
    await queryRunner.query(`DROP TABLE \`discount\``);
  }
}
