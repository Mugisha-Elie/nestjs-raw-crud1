import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Pool } from "pg";
import { PG_CONNECTION } from "../database/database.constants";

export interface Article {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: Date;
}

interface ArticleRow {
  id: number;
  title: string;
  content: string;
  is_published: boolean;
  created_at: Date;
}

@Injectable()
export class ArticlesService {
  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool){}

  private mapRowToArticle(row: ArticleRow): Article {
    return {
      id: row.id,
      title: row.title,
      content: row.content,
      isPublished: row.is_published,
      createdAt: row.created_at,
    }
  }
  
  async create(dto: CreateArticleDto): Promise<Article> {
    const query = `
      INSERT INTO articles (title, content, is_published)
      VALUES ($1, $2, $3)
      RETURNING id, title, content, is_published, created_at
    `;
    const values = [dto.title, dto.content, dto.isPublished]
    const { rows } = await this.pool.query<ArticleRow>(query, values);
    return this.mapRowToArticle(rows[0])
  }

  async findAll(): Promise<Article[]>{
    const query = `
      SELECT id, title, content, is_published, created_at
      FROM articles
      ORDER BY id ASC;
    `;
    const { rows } = await this.pool.query<ArticleRow>(query);
    return rows.map((row) => this.mapRowToArticle(row))
  }

  async findOne(id: number): Promise<Article> {
    const query = `
      SELECT id, title, content, is_published, created_at
      FROM articles
      WHERE id = $1
    `;
    const { rows } = await this.pool.query<ArticleRow>(query, [id])

    if (rows.length === 0) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return this.mapRowToArticle(rows[0])
  }

  async update(id: number, dto: UpdateArticleDto): Promise<Article>{
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (dto.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(dto.title);
    }

    if (dto.content !== undefined) {
      updates.push(`content = $${paramIndex++}`);
      values.push(dto.title);
    }

    if (dto.isPublished !== undefined) {
      updates.push(`is_published = $${paramIndex++}`);
      values.push(dto.isPublished)
    }

    if (updates.length === 0) {
      return this.findOne(id)
    }

    values.push(id);

    const query = `
      UPDATE articles
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, title, content, is_published, created_at;
    `;

    const { rows } = await this.pool.query(query, values);
    if (rows.length === 0) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return this.mapRowToArticle(rows[0]);
    
  }

  async remove(id: number): Promise<void> {
    const query = `DELETE FROM articles WHERE id = $1`
    const result = await this.pool.query(query, [id])
    if (result.rowCount === 0) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }
  }
}