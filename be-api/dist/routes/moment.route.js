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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const controller = __importStar(require("../controllers/moment.controller"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
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
exports.default = router;
