import swaggerJSDoc from 'swagger-jsdoc';

const isProd = process.env.NODE_ENV === 'production';

export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API description here',
  },
  servers: [
    {
      url: process.env.SWAGGER_URL || 'http://localhost:3000',
    },
  ],
};

export const options = {
  swaggerDefinition,
  apis: isProd
    ? ['./dist/routes/*.js', './dist/controllers/*.js']  // Dùng khi build Docker
    : ['./src/routes/*.ts', './src/controllers/*.ts'],   // Dùng khi chạy local dev
};

export const swaggerSpec = swaggerJSDoc(options);
