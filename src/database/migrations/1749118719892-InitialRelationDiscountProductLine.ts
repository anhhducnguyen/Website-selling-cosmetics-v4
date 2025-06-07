import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialRelationDiscountProductLine1749118719892
  implements MigrationInterface
{
  name = 'InitialRelationDiscountProductLine1749118719892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`discount_product_line_product_line\` (\`discountId\` varchar(36) NOT NULL, \`productLineId\` varchar(36) NOT NULL, INDEX \`IDX_77e1323a7cfb556af37f06f214\` (\`discountId\`), INDEX \`IDX_c89ecebd38ecb0708e1219b380\` (\`productLineId\`), PRIMARY KEY (\`discountId\`, \`productLineId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`discount_product_line_product_line\` ADD CONSTRAINT \`FK_77e1323a7cfb556af37f06f214d\` FOREIGN KEY (\`discountId\`) REFERENCES \`discount\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`discount_product_line_product_line\` ADD CONSTRAINT \`FK_c89ecebd38ecb0708e1219b3804\` FOREIGN KEY (\`productLineId\`) REFERENCES \`product_line\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`discount_product_line_product_line\` DROP FOREIGN KEY \`FK_c89ecebd38ecb0708e1219b3804\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`discount_product_line_product_line\` DROP FOREIGN KEY \`FK_77e1323a7cfb556af37f06f214d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c89ecebd38ecb0708e1219b380\` ON \`discount_product_line_product_line\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_77e1323a7cfb556af37f06f214\` ON \`discount_product_line_product_line\``,
    );
    await queryRunner.query(
      `DROP TABLE \`discount_product_line_product_line\``,
    );
  }
}
