import { Router } from 'express';

const router = Router();

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

export default router;
