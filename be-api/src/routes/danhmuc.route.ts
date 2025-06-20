import { Router } from 'express';
import * as danhMucController from '../controllers/danhmuc.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: DanhMuc
 *   description: API quản lý danh mục
 */

/**
 * @swagger
 * /api/danhmuc:
 *   get:
 *     summary: Lấy danh sách tất cả danh mục
 *     tags: [DanhMuc]
 *     responses:
 *       200:
 *         description: Danh sách danh mục trả về
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DanhMuc'
 */
router.get('/', danhMucController.getAll);

/**
 * @swagger
 * /api/danhmuc:
 *   post:
 *     summary: Tạo danh mục mới
 *     tags: [DanhMuc]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DanhMuc'
 *     responses:
 *       201:
 *         description: Danh mục được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DanhMuc'
 */
router.post('/', danhMucController.create);

export default router;
