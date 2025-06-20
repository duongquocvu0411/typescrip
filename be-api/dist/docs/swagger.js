"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = exports.options = exports.swaggerDefinition = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const nodeEnv = process.env.NODE_ENV?.trim(); // đảm bảo không có khoảng trắng
const isProd = nodeEnv === 'production';
// 🔍 Log để debug khi cần
console.log('[SWAGGER] NODE_ENV =', nodeEnv);
exports.swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API mô tả các endpoint của hệ thống',
    },
    servers: [
        {
            url: isProd
                ? process.env.SWAGGER_URL || 'https://be-api-typescrrip.onrender.com'
                : 'http://localhost:3000',
        },
    ],
};
exports.options = {
    swaggerDefinition: exports.swaggerDefinition,
    apis: isProd
        ? ['./dist/routes/**/*.js', './dist/controllers/**/*.js']
        : ['./src/routes/**/*.ts', './src/controllers/**/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(exports.options);
