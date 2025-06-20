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
const danhMucController = __importStar(require("../controllers/danhmuc.controller"));
const router = (0, express_1.Router)();
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
exports.default = router;
