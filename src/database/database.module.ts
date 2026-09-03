import { Module, Global } from "@nestjs/common";
import { Pool } from 'pg';
import { PG_CONNECTION } from "./database.constants";

const dbProvider = {
  provide: PG_CONNECTION,
  useFactory: async (): Promise<Pool> => {
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      max: 10,
      idleTimeoutMillis: 30 * 1000,
      connectionTimeoutMillis: 2 * 1000,
    });

    const client = await pool.connect();
    client.release();

    return pool;
  }
}


@Global()
@Module({
  providers: [dbProvider],
  exports: [PG_CONNECTION]
})
export class DatabaseModule {}