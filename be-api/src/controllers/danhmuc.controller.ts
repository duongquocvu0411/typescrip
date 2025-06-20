import { Request, Response } from 'express';
import * as danhMucService from '../services/danhmuc.service';
import { DanhMucDTO } from '../interfaces/danhmuc.interface';

export async function getAll(req: Request, res: Response) {
  try {
    const list = await danhMucService.getAllDanhMuc();
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
}

export async function create(req: Request, res: Response) {
  const data: DanhMucDTO = req.body;
  if (!data.ten) return res.status(400).json({ message: 'Tên không được để trống' });

  try {
    const newDanhMuc = await danhMucService.createDanhMuc(data);
    res.status(201).json(newDanhMuc);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo danh mục' });
  }
}
