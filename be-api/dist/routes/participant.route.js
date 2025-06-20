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
const express_1 = require("express");
const participantController = __importStar(require("../controllers/participant.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Participants
 *   description: API quản lý Participants
 */
/**
 * @swagger
 * /api/participants:
 *   get:
 *     summary: Lấy danh sách tất cả participants
 *     tags: [Participants]
 *     responses:
 *       200:
 *         description: Danh sách participant
 */
router.get('/', participantController.getAll);
/**
 * @swagger
 * /api/participants/{id}:
 *   get:
 *     summary: Lấy participant theo ID
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID participant
 *     responses:
 *       200:
 *         description: Participant tìm thấy
 *       404:
 *         description: Không tìm thấy participant
 */
router.get('/:id', participantController.getById);
/**
 * @swagger
 * /api/participants:
 *   post:
 *     summary: Tạo participant mới
 *     tags: [Participants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Participant được tạo
 */
router.post('/', participantController.create);
/**
 * @swagger
 * /api/participants/{id}:
 *   put:
 *     summary: Cập nhật participant
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID participant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy participant
 */
router.put('/:id', participantController.update);
/**
 * @swagger
 * /api/participants/{id}:
 *   delete:
 *     summary: Xóa participant
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID participant
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy participant
 */
router.delete('/:id', participantController.remove);
exports.default = router;
