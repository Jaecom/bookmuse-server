// src/quotes/quotes.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class QuotesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const query = this.db.query('SELECT * FROM quotes');
    return query
  }

  async findOne(id: string) {
    const query = this.db.query(`SELECT * FROM quotes WHERE ID = '${id}'`);
    return query
  }

  async findMatch(ids: string[]) {
    const placeholders = ids.map(() => '?').join(', ');
    const sql = `SELECT * FROM quotes WHERE id IN (${placeholders})`;
    const result = await this.db.query(sql, ids);
    return result;
  }
}