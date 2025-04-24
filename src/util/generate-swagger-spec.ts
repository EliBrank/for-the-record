import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import yaml from 'yaml';
import { options } from 'config/swagger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import logger from 'config/logger.js';

logger.info('Starting: generate-swagger-spec script');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const specs = swaggerJSDoc(options);
const outputPath = resolve(__dirname, '../../design_documents/api_spec.yaml')

fs.writeFileSync(outputPath, yaml.stringify(specs));

logger.info('Ending: generate-swagger-spec script');
