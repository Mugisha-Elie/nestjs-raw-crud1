import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  NotFoundException
} from "@nestjs/common";

import { Article, ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Controller('articles')
export class ArticlesController{
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  create(@Body() dto: CreateArticleDto) {
    return this.articlesService.create(dto)
  }

  @Get()
  findAll(): Article[]{
    return this.articlesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Article {
    const article = this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleDto
  ): Article {
    const updated = this.articlesService.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    const deleted = this.articlesService.remove(id)
    if (!deleted) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  }
}