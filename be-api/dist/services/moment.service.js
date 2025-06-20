"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMoments = getAllMoments;
exports.getMomentById = getMomentById;
exports.createMoment = createMoment;
exports.updateMoment = updateMoment;
exports.deleteMoment = deleteMoment;
const data_source_1 = require("../config/data-source");
const Moment_1 = require("../models/Moment");
const repo = data_source_1.AppDataSource.getRepository(Moment_1.Moment);
async function getAllMoments() {
    return repo.find({ order: { created_at: 'DESC' } });
}
async function getMomentById(id) {
    return repo.findOneBy({ id });
}
async function createMoment(data) {
    const moment = repo.create(data);
    return repo.save(moment);
}
async function updateMoment(id, data) {
    const moment = await repo.findOneBy({ id });
    if (!moment)
        return null;
    repo.merge(moment, data);
    return repo.save(moment);
}
async function deleteMoment(id) {
    const result = await repo.delete(id);
    return result.affected !== 0;
}
