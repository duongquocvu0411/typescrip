import { Router } from 'express';
import * as participantController from '../controllers/participant.controller';

const router = Router();

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

export default router;
