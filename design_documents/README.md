## Goals
Given a SQL database containing data for a vinyl collection imported from Discogs, create an accompanying REST API able to query music releases, returning those which match information filtered via an existing front-end. The API should be able to support searching releases by title and artist, as well as additional filtering via release format (LP, EP, etc.).

### Endpoints:
GET /releases

Given the data available in the releases table, a single GET endpoint here should be suitable for all functionality needed for the front-end.

## Tools
Back-end: Node.js, Express.js
Database: PostgreSQL
ORM: Prisma
Testing: Jest
Documentation: Swagger, via swagger-jsdoc and swagger-ui-express

## Timeline
Back-end Setup: 1 day (Express, Prisma, database connection)
API Implementation: 2 days (search/filter logic, error handling)
Testing: 0.5 days
Documentation: 0.5 days
Additional Troubleshooting: 2 days
