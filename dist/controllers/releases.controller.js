import { PrismaClient } from '@prisma/client';
import logger from '../config/logger.js';
const prisma = new PrismaClient();
const getReleases = async (req, res) => {
    logger.info('Starting: getReleases function');
    try {
        // variables defined using object destructuring with default values
        // i.e. sort is set to 'title' if no sort oition in req object
        const { sort = 'title', order = 'asc', format, page = '1', limit = '10' } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        let orderBy = {};
        if (sort === 'artist') {
            orderBy = {
                artists: {
                    artist: {
                        name: order
                    }
                }
            };
        }
        else if (sort === 'year') {
            orderBy.year = order;
        }
        else {
            orderBy.title = order;
        }
        // start building where clause
        const where = {};
        if (format) {
            if (Array.isArray(format)) {
                where.format = {
                    name: {
                        in: format.map(f => f.toString())
                    }
                };
            }
            else if (typeof format === 'string' && format.includes(',')) {
                where.format = {
                    name: {
                        in: format.split(',').map(f => f.trim())
                    }
                };
            }
            else {
                where.format = {
                    name: {
                        equals: format.toString()
                    }
                };
            }
        }
        const releases = await prisma.release.findMany({
            include: {
                artists: {
                    include: {
                        artist: true
                    }
                },
                format: true,
                cover_art: true
            },
            where,
            orderBy,
            skip: (pageNum - 1) * limitNum,
            take: limitNum
        });
        const total = await prisma.release.count({ where });
        logger.info(`Retrieved ${releases.length} releases`);
        res.json({
            data: releases,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum)
            }
        });
        logger.info('Ending: getReleases function');
    }
    catch (error) {
        logger.error(`Error fetching releases: ${error}`);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
export default getReleases;
//# sourceMappingURL=releases.controller.js.map