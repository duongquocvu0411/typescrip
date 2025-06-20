"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDanhMuc = getAllDanhMuc;
exports.createDanhMuc = createDanhMuc;
const data_source_1 = require("../config/data-source");
const DanhMuc_1 = require("../models/DanhMuc");
const repo = data_source_1.AppDataSource.getRepository(DanhMuc_1.DanhMuc);
async function getAllDanhMuc() {
    return repo.find();
}
async function createDanhMuc(data) {
    const entity = repo.create(data);
    return repo.save(entity);
}
