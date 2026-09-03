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
  NotFoundException,
  UsePipes
} from "@nestjs/common";

import { Article, ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { CreateArticleValidationPipe } from "../common/pipes/create-article-validation.pipe";

@Controller('articles')
export class ArticlesController{
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  @UsePipes(CreateArticleValidationPipe)
  async create(@Body() dto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(dto)
  }

  @Get()
  async findAll(): Promise<Article[]>{
    return this.articlesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articlesService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleDto
  ): Promise<Article> {
    return this.articlesService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.articlesService.remove(id)
  }
}