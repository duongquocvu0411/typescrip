import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Moment } from '../models/Moment';
import cloudinary from '../config/cloudinary';
import fs from 'fs/promises';

const repo = AppDataSource.getRepository(Moment);

export async function getAll(req: Request, res: Response) {
  const moments = await repo.find({ order: { created_at: 'DESC' } });
  res.json(moments);
}

export async function getById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const moment = await repo.findOneBy({ id });
  if (!moment) return res.status(404).json({ message: 'Moment không tồn tại.' });
  res.json(moment);
}

export async function create(req: Request, res: Response) {
  const { description } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: 'Ảnh không được để trống.' });

  const uploaded = await cloudinary.uploader.upload(file.path, {
    folder: 'moments',
  });

  await fs.unlink(file.path); // Xoá file local

  const newMoment = repo.create({
    description,
    imageurl: uploaded.secure_url,
    created_at: new Date(),
  });

  const saved = await repo.save(newMoment);
  res.status(201).json(saved);
}

export async function update(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { description } = req.body;
  const file = req.file;

  const moment = await repo.findOneBy({ id });
  if (!moment) return res.status(404).json({ message: 'Moment không tồn tại.' });

  moment.description = description;

  if (file) {
    const uploaded = await cloudinary.uploader.upload(file.path, {
      folder: 'moments',
    });
    await fs.unlink(file.path);
    moment.imageurl = uploaded.secure_url;
  }

  const updated = await repo.save(moment);
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const moment = await repo.findOneBy({ id });
  if (!moment) return res.status(404).json({ message: 'Moment không tồn tại.' });

  await repo.remove(moment);
  res.status(204).send();
}
