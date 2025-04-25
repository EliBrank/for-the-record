import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { releasesRouter } from './routes/releases.routes.js';
import logger from './config/logger.js';
import { setupSwagger } from './config/swagger.js';
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;
setupSwagger(app);
app.use(cors());
app.use(express.json());
app.use('/releases', releasesRouter);
app.get('/', (req, res) => {
    res.send('For the Record API is up and running!');
});
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    logger.info('Server shut down');
    process.exit(0);
});
//# sourceMappingURL=main.js.map