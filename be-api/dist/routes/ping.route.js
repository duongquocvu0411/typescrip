"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: API kiểm tra uptime
 *     tags: [Ping]
 *     responses:
 *       200:
 *         description: Server vẫn hoạt động
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Pong from server
 */
router.get('/', (req, res) => {
    res.send('Pong from server');
});
exports.default = router;
