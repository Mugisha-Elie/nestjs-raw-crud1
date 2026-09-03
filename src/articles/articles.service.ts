import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

export interface Article {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: Date;
}

@Injectable()
export class ArticlesService {
  private articles: Article[] = [];
  private nextId = 1;

  create(dto: CreateArticleDto): Article {
    const newArticle: Article = {
      id: this.nextId++,
      title: dto.title,
      content: dto.content,
      isPublished: dto.isPublished ?? false,
      createdAt: new Date(),
    };
    this.articles.push(newArticle);
    return newArticle;
  }

  findAll(): Article[]{
    return this.articles;
  }

  findOne(id: number): Article | null {
    return this.articles.find(item => item.id === id) || null;
  }

  update(id: number, dto: UpdateArticleDto): Article | null{
    const article = this.findOne(id);
    if (!article) return null;
    
    if (dto.title !== undefined) article.title = dto.title;
    if (dto.content !== undefined) article.content = dto.content;
    if (dto.isPublished !== undefined) article.isPublished = dto.isPublished;

    return article
  }

  remove(id: number): boolean {
    const index = this.articles.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.articles.splice(index, 1);
    return true;
  }
}