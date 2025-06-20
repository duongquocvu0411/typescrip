import { AppDataSource } from '../config/data-source';
import { Moment } from '../models/Moment';
import { MomentDTO } from '../interfaces/moment.interface';

const repo = AppDataSource.getRepository(Moment);

export async function getAllMoments(): Promise<Moment[]> {
  return repo.find({ order: { created_at: 'DESC' } });
}

export async function getMomentById(id: number): Promise<Moment | null> {
  return repo.findOneBy({ id });
}

export async function createMoment(data: Partial<Moment>): Promise<Moment> {
  const moment = repo.create(data);
  return repo.save(moment);
}

export async function updateMoment(id: number, data: Partial<Moment>): Promise<Moment | null> {
  const moment = await repo.findOneBy({ id });
  if (!moment) return null;
  repo.merge(moment, data);
  return repo.save(moment);
}

export async function deleteMoment(id: number): Promise<boolean> {
  const result = await repo.delete(id);
  return result.affected !== 0;
}