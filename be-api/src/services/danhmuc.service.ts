import { AppDataSource } from '../config/data-source';
import { DanhMuc } from '../models/DanhMuc';
import { DanhMucDTO } from '../interfaces/danhmuc.interface';

const repo = AppDataSource.getRepository(DanhMuc);

export async function getAllDanhMuc(): Promise<DanhMuc[]> {
  return repo.find();
}

export async function createDanhMuc(data: DanhMucDTO): Promise<DanhMuc> {
  const entity = repo.create(data);
  return repo.save(entity);
}
