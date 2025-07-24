import { MigrationInterface, QueryRunner } from 'typeorm';

export class Base1752723266169 implements MigrationInterface {
  name = 'Base1752723266169';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_image\` DROP FOREIGN KEY \`FK_40ca0cd115ef1ff35351bed8da2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`discount_product_line_product_line\` DROP FOREIGN KEY \`FK_c89ecebd38ecb0708e1219b3804\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_image\` ADD CONSTRAINT \`FK_40ca0cd115ef1ff35351bed8da2\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`discount_product_line_product_line\` ADD CONSTRAINT \`FK_c89ecebd38ecb0708e1219b3804\` FOREIGN KEY (\`productLineId\`) REFERENCES \`product_line\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`discount_product_line_product_line\` DROP FOREIGN KEY \`FK_c89ecebd38ecb0708e1219b3804\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_image\` DROP FOREIGN KEY \`FK_40ca0cd115ef1ff35351bed8da2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`discount_product_line_product_line\` ADD CONSTRAINT \`FK_c89ecebd38ecb0708e1219b3804\` FOREIGN KEY (\`productLineId\`) REFERENCES \`product_line\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_image\` ADD CONSTRAINT \`FK_40ca0cd115ef1ff35351bed8da2\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
