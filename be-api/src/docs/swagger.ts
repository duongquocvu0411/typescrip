import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API description here',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
};

export const options = {
  swaggerDefinition,
  apis: ['src/routes/*.ts', 'src/controllers/*.ts'], // Đường dẫn tới file có chú thích swagger
};

export const swaggerSpec = swaggerJSDoc(options);
