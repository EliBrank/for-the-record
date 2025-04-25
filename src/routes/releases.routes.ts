import express from 'express';
import getReleases from 'controllers/releases.controller.js';

const router = express.Router();

/**
  * @swagger
  *   /releases:
  *     get:
  *       summary: Get a list of all releases
  *       tags:
  *         - Releases
  *       responses:
  *         200:
  *           description: A list of releases
  *           content:
  *             application/json:
  *               schema:
  *                 type: array
  *                 items:
  *                   $ref: '#/components/schemas/Release'
  */
router.get('/', getReleases);

export { router as releasesRouter }
