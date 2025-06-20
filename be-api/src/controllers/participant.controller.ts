import { Request, Response } from 'express';
import * as participantService from '../services/participant.service';
import { EmailService } from '../services/email.service';
import { ParticipantDTO } from '../interfaces/participant.interface';

const emailService = new EmailService();

export async function getAll(req: Request, res: Response) {
  const participants = await participantService.getAllParticipants();
  res.json(participants);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const participant = await participantService.getParticipantById(id);
  if (!participant) return res.status(404).json({ message: 'Không tìm thấy' });
  res.json(participant);
}

export async function create(req: Request, res: Response) {
  const data: ParticipantDTO = req.body;
  const participant = await participantService.createParticipant(data);
  await emailService.sendParticipantNotificationAsync(data.name, data.message);
  res.status(201).json(participant);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const data: ParticipantDTO = req.body;
  const updated = await participantService.updateParticipant(id, data);
  if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = await participantService.deleteParticipant(id);
  if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
  res.json(deleted);
}
