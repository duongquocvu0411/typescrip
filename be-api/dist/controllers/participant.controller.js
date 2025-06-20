"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const participantService = __importStar(require("../services/participant.service"));
const email_service_1 = require("../services/email.service");
const emailService = new email_service_1.EmailService();
async function getAll(req, res) {
    const participants = await participantService.getAllParticipants();
    res.json(participants);
}
async function getById(req, res) {
    const id = Number(req.params.id);
    const participant = await participantService.getParticipantById(id);
    if (!participant)
        return res.status(404).json({ message: 'Không tìm thấy' });
    res.json(participant);
}
async function create(req, res) {
    const data = req.body;
    const participant = await participantService.createParticipant(data);
    await emailService.sendParticipantNotificationAsync(data.name, data.message);
    res.status(201).json(participant);
}
async function update(req, res) {
    const id = Number(req.params.id);
    const data = req.body;
    const updated = await participantService.updateParticipant(id, data);
    if (!updated)
        return res.status(404).json({ message: 'Không tìm thấy' });
    res.json(updated);
}
async function remove(req, res) {
    const id = Number(req.params.id);
    const deleted = await participantService.deleteParticipant(id);
    if (!deleted)
        return res.status(404).json({ message: 'Không tìm thấy' });
    res.json(deleted);
}
