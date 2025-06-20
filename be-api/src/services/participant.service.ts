import { AppDataSource } from '../config/data-source';
import { Participant } from '../models/Participant';
import { ParticipantDTO } from '../interfaces/participant.interface';
import { EmailService } from '../services/email.service';


const emailService = new EmailService();
const repo = AppDataSource.getRepository(Participant);

export async function getAllParticipants(): Promise<Participant[]> {
  return repo.find({ order: { createdAt: 'DESC' } });
}

export async function getParticipantById(id: number): Promise<Participant | null> {
  return repo.findOneBy({ id });
}

export async function createParticipant(data: ParticipantDTO): Promise<Participant> {
  const participant = repo.create(data as Partial<Participant>);
  participant.createdAt = new Date();

  const saved = await repo.save(participant);

  // Gửi email với đúng dữ liệu
  await emailService.sendParticipantNotificationAsync(data.name, data.message);

  return saved;
}


export async function updateParticipant(id: number, data: ParticipantDTO): Promise<Participant | null> {
  const participant = await repo.findOneBy({ id });
  if (!participant) return null;
  repo.merge(participant, data as Partial<Participant>);
  return repo.save(participant);
}

export async function deleteParticipant(id: number): Promise<Participant | null> {
  const participant = await repo.findOneBy({ id });
  if (!participant) return null;

  await repo.remove(participant);
  return participant;
}

