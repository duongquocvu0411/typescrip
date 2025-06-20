import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import danhMucRouter from './routes/danhmuc.route';
import momentRouter from './routes/moment.route';
import participantRouter from './routes/participant.route';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

dotenv.config(); // Đọc .env đầu tiên

const app = express();

// CORS: cho phép từ local và Netlify
app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'https://nguyenngoctram-le-tot-nghiep.netlify.app',
    ],
    credentials: true,
  })
);

// Parse JSON body
app.use(express.json());

// Các router API
app.use('/api/danhmuc', danhMucRouter);
app.use('/api/participants', participantRouter);
app.use('/api/moments', momentRouter);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Kết nối DB và khởi động server
const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📖 Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });
