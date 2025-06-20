import * as dotenv from 'dotenv';
dotenv.config(); // Đọc .env đầu tiên
import express from 'express';
import cors from 'cors';


import { AppDataSource } from './config/data-source';
import danhMucRouter from './routes/danhmuc.route';
import momentRouter from './routes/moment.route';
import participantRouter from './routes/participant.route';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import pingRouter from './routes/ping.route';


const app = express();

// CORS: cho phép từ local và Netlify
app.use(
  cors({
    origin:"*",
    credentials: true,
  })
);

// Parse JSON body
app.use(express.json());

// Các router API
app.use('/api/danhmuc', danhMucRouter);
app.use('/api/participants', participantRouter);
app.use('/api/moments', momentRouter);
app.use('/api/ping', pingRouter);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Kết nối DB và khởi động server
// Kết nối DB và khởi động server
const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected');

    // Debug biến môi trường
    console.log('🌍 NODE_ENV:', process.env.NODE_ENV);
    const spec = swaggerSpec as { servers?: { url: string }[] };
console.log('📡 Swagger Server URL:', spec.servers?.[0]?.url || 'Không xác định');


    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📖 Swagger UI: http://localhost:${PORT}/api-docs`);
      console.log('✅ Ping endpoint: /api/ping');
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });

