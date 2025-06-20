"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDanhMuc1750388667495 = void 0;
class CreateDanhMuc1750388667495 {
    constructor() {
        this.name = 'CreateDanhMuc1750388667495';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "danh_muc" ("id" SERIAL NOT NULL, "ten" character varying NOT NULL, CONSTRAINT "PK_9f23e8018b17ea0554c36bf30da" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "danh_muc"`);
    }
}
exports.CreateDanhMuc1750388667495 = CreateDanhMuc1750388667495;
