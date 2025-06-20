"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllParticipants = getAllParticipants;
exports.getParticipantById = getParticipantById;
exports.createParticipant = createParticipant;
exports.updateParticipant = updateParticipant;
exports.deleteParticipant = deleteParticipant;
const data_source_1 = require("../config/data-source");
const Participant_1 = require("../models/Participant");
const email_service_1 = require("../services/email.service");
const emailService = new email_service_1.EmailService();
const repo = data_source_1.AppDataSource.getRepository(Participant_1.Participant);
async function getAllParticipants() {
    return repo.find({ order: { createdAt: 'DESC' } });
}
async function getParticipantById(id) {
    return repo.findOneBy({ id });
}
async function createParticipant(data) {
    const participant = repo.create(data);
    participant.createdAt = new Date();
    const saved = await repo.save(participant);
    // Gửi email với đúng dữ liệu
    await emailService.sendParticipantNotificationAsync(data.name, data.message);
    return saved;
}
async function updateParticipant(id, data) {
    const participant = await repo.findOneBy({ id });
    if (!participant)
        return null;
    repo.merge(participant, data);
    return repo.save(participant);
}
async function deleteParticipant(id) {
    const participant = await repo.findOneBy({ id });
    if (!participant)
        return null;
    await repo.remove(participant);
    return participant;
}
