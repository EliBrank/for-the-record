import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import logger from 'config/logger.js';

const prisma = new PrismaClient();

const getReleases = async (req: Request, res: Response) => {
  logger.info('Starting: getReleases function');
  try {
    // variables defined using object destructuring with default values
    // i.e. sort is set to 'title' if no sort oition in req object
    const {
      sort = 'title', order = 'asc', format, page = '1', limit = '10'
    } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    let orderBy: any = {};

    if (sort === 'artist') {
      orderBy = {
        artists: {
          artist: {
            name: order as Prisma.SortOrder
          }
        }
      };
    } else if (sort === 'year') {
      orderBy.year = order as Prisma.SortOrder;
    } else {
      orderBy.title = order as Prisma.SortOrder;
    }

    // start building where clause
    const where: Prisma.ReleaseWhereInput = {};

    if (format) {
      if (Array.isArray(format)) {
        where.format_id = {
          in: format.map(f => parseInt(f as string))
        };
      } else if (typeof format === 'string' && format.includes(',')) {
        where.format_id = {
          in: format.split(',').map(f => parseInt(f))
        };
      } else {
        where.format_id = parseInt(format as string);
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
  } catch (error) {
    logger.error(`Error fetching releases: ${error}`);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

export default getReleases;
