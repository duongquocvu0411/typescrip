import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: isProd
    ? ['dist/models/**/*.js']     // Khi chạy bằng `npm start`
    : ['src/models/**/*.ts'],     // Khi dev bằng `npm run dev`
  migrations: isProd
    ? ['dist/migrations/**/*.js']
    : ['src/migrations/**/*.ts'],
  ssl: process.env.DB_SSL === 'true',
  extra: {
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  },
});
