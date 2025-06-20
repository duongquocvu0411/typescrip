import { AppDataSource } from '../config/data-source';
import { GraduationEventInfo } from '../models/GraduationEventInfo';
import { Repository } from 'typeorm';
import { GraduationEventInfoDTO } from '../interfaces/graduationEventInfo.interface';

const repo: Repository<GraduationEventInfo> = AppDataSource.getRepository(GraduationEventInfo);

const dayOfWeekVi: Record<number, string> = {
  0: 'chủ nhật',
  1: 'thứ hai',
  2: 'thứ ba',
  3: 'thứ tư',
  4: 'thứ năm',
  5: 'thứ sáu',
  6: 'thứ bảy',
};

function getTimeLabel(time: string): string {
  const hour = parseInt(time.split(':')[0], 10);
  return hour < 12 ? `${time} - sáng` : `${time} - chiều`;
}

function formatDateVi(dateStr: string): string {
  const date = new Date(dateStr);
  const dayName = dayOfWeekVi[date.getDay()];
  return `${dayName} - ${dateStr}`;
}

export const GraduationEventService = {
  async getAll() {
    const data = await repo.find();
    return data.map(item => ({
      id: item.id,
      event_date: formatDateVi(item.event_date),
      start_time: getTimeLabel(item.start_time),
      location: item.location,
      map_url: item.map_url,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  },

  async getById(id: number) {
    const item = await repo.findOneBy({ id });
    if (!item) return null;
    return {
      id: item.id,
      event_date: formatDateVi(item.event_date),
      start_time: getTimeLabel(item.start_time),
      location: item.location,
      map_url: item.map_url,
      created_at: item.created_at,
      updated_at: item.updated_at,
    };
  },

  async create(dto: GraduationEventInfoDTO) {
    const entity = repo.create(dto);
    const saved = await repo.save(entity);
    return {
      id: saved.id,
      event_date: formatDateVi(saved.event_date),
      start_time: getTimeLabel(saved.start_time),
      location: saved.location,
      map_url: saved.map_url,
      created_at: saved.created_at,
      updated_at: saved.updated_at,
    };
  },

  async update(id: number, dto: GraduationEventInfoDTO) {
    const existing = await repo.findOneBy({ id });
    if (!existing) return null;
    Object.assign(existing, dto);
    const updated = await repo.save(existing);
    return {
      id: updated.id,
      event_date: formatDateVi(updated.event_date),
      start_time: getTimeLabel(updated.start_time),
      location: updated.location,
      map_url: updated.map_url,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
    };
  },

  async delete(id: number) {
    const result = await repo.delete(id);
    return result.affected ?? 0;
  }
};
