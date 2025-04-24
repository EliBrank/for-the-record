import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'For the Record API',
      version: '1.0.0'
    },
    servers: [{
      url: 'http://localhost:3000'
    }],
    components: {
      schemas: {
        Release: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string', example: 'Abbey Road' },
            year: { type: 'integer', example: 1969 },
            format: { $ref: '#/components/schemas/Format' },
            artists: {
              type: 'array',
              items: { $ref: '#/components/schemas/Artist' },
            },
            cover_art: { $ref: '#/components/schemas/CoverArt' },
          },
        },
        Artist: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string', example: 'The Beatles' },
          },
        },
        Format: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string', example: 'LP' },
          },
        },
        CoverArt: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            file_path: {
              type: 'string',
              example: '/images/default-cover.png',
            },
            is_default: { type: 'boolean' },
          },
        },
      },
    },
  },
  apis: [
    // depending on last used npm script...
    process.env.NODE_ENV === 'production'
    ? './dist/routes/*.js' // use production files
    : './src/routes/*.ts' // use development files
    // see package.json scripts for how NODE_ENV changes
  ]
};

export const setupSwagger = (app: Express) => {
  const specs = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
