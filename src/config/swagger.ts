
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';


const userSpec = YAML.load(path.join(__dirname, '../docs/user.yaml'));
const adminSpec = YAML.load(path.join(__dirname, '../docs/admin.yaml'));
const superadminSpec = YAML.load(path.join(__dirname, '../docs/superadmin.yaml'));
const notificationsSpec = YAML.load(path.join(__dirname, '../docs/notifications.yaml'));

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Job Portal API',
    version: '1.0.0',
    description: 'API for a job portal with user, admin, and superadmin roles',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    ...userSpec.paths,
    ...adminSpec.paths,
    ...superadminSpec.paths,
    ...notificationsSpec.paths
  },
};

export default swaggerSpec;

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};