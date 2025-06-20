import swaggerJSDoc from 'swagger-jsdoc';

const nodeEnv = process.env.NODE_ENV?.trim(); // đảm bảo không có khoảng trắng
const isProd = nodeEnv === 'production';

// 🔍 Log để debug khi cần
console.log('[SWAGGER] NODE_ENV =', nodeEnv);

export const swaggerDefinition = {
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

export const options = {
  swaggerDefinition,
  apis: isProd
    ? ['./dist/routes/**/*.js', './dist/controllers/**/*.js']
    : ['./src/routes/**/*.ts', './src/controllers/**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
