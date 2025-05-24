// src/database/database.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: mysql.Pool;

  async onModuleInit() {
    this.pool = mysql.createPool({
      host: '127.0.0.1',
      port: Number(process.env['DB_PORT']) ?? 0,
      user: 'root',
      password: process.env['DB_PW'] ?? "",
      database: process.env['DB_NAME'] ?? "",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query(sql: string, params?: any[]) {
    const [rows] = await this.pool.query(sql, params);
    return rows;
  }

  async execute(sql: string, params?: any[]) {
    const [result] = await this.pool.execute(sql, params);
    return result;
  }
}