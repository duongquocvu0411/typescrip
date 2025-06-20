import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDanhMuc1750388667495 implements MigrationInterface {
    name = 'CreateDanhMuc1750388667495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "danh_muc" ("id" SERIAL NOT NULL, "ten" character varying NOT NULL, CONSTRAINT "PK_9f23e8018b17ea0554c36bf30da" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "danh_muc"`);
    }

}
