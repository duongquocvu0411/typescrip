import { Router } from 'express';
import multer from 'multer';
import * as controller from '../controllers/moment.controller';

const router = Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * tags:
 *   name: Moments
 *   description: API quản lý các khoảnh khắc (Moments)
 */

/**
 * @swagger
 * /api/moments:
 *   get:
 *     summary: Lấy danh sách moments
 *     tags: [Moments]
 *     responses:
 *       200:
 *         description: Trả về danh sách moments
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/moments/{id}:
 *   get:
 *     summary: Lấy moment theo ID
 *     tags: [Moments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của moment
 *     responses:
 *       200:
 *         description: Trả về moment theo ID
 *       404:
 *         description: Không tìm thấy
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/moments:
 *   post:
 *     summary: Tạo moment mới
 *     tags: [Moments]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - image
 *             properties:
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Moment đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', upload.single('image'), controller.create);

/**
 * @swagger
 * /api/moments/{id}:
 *   put:
 *     summary: Cập nhật moment
 *     tags: [Moments]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của moment cần cập nhật
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Moment đã được cập nhật
 *       404:
 *         description: Không tìm thấy moment
 */
router.put('/:id', upload.single('image'), controller.update);

/**
 * @swagger
 * /api/moments/{id}:
 *   delete:
 *     summary: Xóa moment
 *     tags: [Moments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy moment
 */
router.delete('/:id', controller.remove);

export default router;
