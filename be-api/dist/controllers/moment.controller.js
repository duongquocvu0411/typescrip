"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const data_source_1 = require("../config/data-source");
const Moment_1 = require("../models/Moment");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const promises_1 = __importDefault(require("fs/promises"));
const repo = data_source_1.AppDataSource.getRepository(Moment_1.Moment);
async function getAll(req, res) {
    const moments = await repo.find({ order: { created_at: 'DESC' } });
    res.json(moments);
}
async function getById(req, res) {
    const id = parseInt(req.params.id);
    const moment = await repo.findOneBy({ id });
    if (!moment)
        return res.status(404).json({ message: 'Moment không tồn tại.' });
    res.json(moment);
}
async function create(req, res) {
    const { description } = req.body;
    const file = req.file;
    if (!file)
        return res.status(400).json({ message: 'Ảnh không được để trống.' });
    const uploaded = await cloudinary_1.default.uploader.upload(file.path, {
        folder: 'moments',
    });
    await promises_1.default.unlink(file.path); // Xoá file local
    const newMoment = repo.create({
        description,
        imageurl: uploaded.secure_url,
        created_at: new Date(),
    });
    const saved = await repo.save(newMoment);
    res.status(201).json(saved);
}
async function update(req, res) {
    const id = parseInt(req.params.id);
    const { description } = req.body;
    const file = req.file;
    const moment = await repo.findOneBy({ id });
    if (!moment)
        return res.status(404).json({ message: 'Moment không tồn tại.' });
    moment.description = description;
    if (file) {
        const uploaded = await cloudinary_1.default.uploader.upload(file.path, {
            folder: 'moments',
        });
        await promises_1.default.unlink(file.path);
        moment.imageurl = uploaded.secure_url;
    }
    const updated = await repo.save(moment);
    res.json(updated);
}
async function remove(req, res) {
    const id = parseInt(req.params.id);
    const moment = await repo.findOneBy({ id });
    if (!moment)
        return res.status(404).json({ message: 'Moment không tồn tại.' });
    await repo.remove(moment);
    res.status(204).send();
}
