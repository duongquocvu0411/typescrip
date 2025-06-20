// src/config/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';


dotenv.config();

const isSSL = process.env.DB_SSL === 'true';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  ssl: isSSL,
  extra: isSSL
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {},
});
