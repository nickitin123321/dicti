//TODO data from local storage to db.
import pg from 'pg';

const dbConfig = {
  user: process.env.POSTGRES_USER ?? 'postgress',
  password: process.env.POSTGRES_PASSWORD ?? 'root',
  database: process.env.PG_DB ?? 'chat123',
  host: process.env.POSTGRES_HOST ?? 'postgres',
  port: +(process.env.POSTGRES_PORT ?? 5432),
};

const pgPool = new pg.Pool(dbConfig);

export default pgPool;
