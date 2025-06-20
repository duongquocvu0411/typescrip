"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isProd = process.env.NODE_ENV === 'production';
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: isProd
        ? ['dist/models/**/*.js']
        : ['src/models/**/*.ts'], // 👈 chạy dev phải dùng .ts
    migrations: isProd
        ? ['dist/migrations/**/*.js']
        : ['src/migrations/**/*.ts'],
    ssl: process.env.DB_SSL === 'true',
    extra: {
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    },
});
