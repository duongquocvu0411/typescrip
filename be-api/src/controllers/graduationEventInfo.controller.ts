import { Request, Response } from 'express';
import { GraduationEventService } from '../services/graduationEventInfo.service';

export const getAllGraduationEvents = async (_req: Request, res: Response) => {
  const data = await GraduationEventService.getAll();
  res.json(data);
};

export const getGraduationEventDetail = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID không hợp lệ' });

  const item = await GraduationEventService.getById(id);
  if (!item) return res.status(404).json({ message: 'Không tìm thấy sự kiện' });

  res.json(item);
};

export const createGraduationEvent = async (req: Request, res: Response) => {
  try {
    const data = await GraduationEventService.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo sự kiện', error: err });
  }
};

export const updateGraduationEvent = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID không hợp lệ' });

  try {
    const data = await GraduationEventService.update(id, req.body);
    if (!data) return res.status(404).json({ message: 'Không tìm thấy sự kiện' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật sự kiện', error: err });
  }
};

export const deleteGraduationEvent = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID không hợp lệ' });

  const result = await GraduationEventService.delete(id);
  if (!result) return res.status(404).json({ message: 'Không tìm thấy hoặc xoá thất bại' });

  res.json({ message: 'Xoá thành công' });
};
