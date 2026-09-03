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

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

import { Article, ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { CreateArticleValidationPipe } from "../common/pipes/create-article-validation.pipe";

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController{
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  @UsePipes(CreateArticleValidationPipe)
  @ApiOperation({ summary: 'Create a new article '})
  @ApiResponse({status: 201, description: 'Article created successfully'})
  @ApiResponse({status: 400, description: 'Validation failed or malformed payload.'})
  async create(@Body() dto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all articles' })
  @ApiResponse({ status: 200, description: 'List of all articles returned' })
  async findAll(): Promise<Article[]>{
    return this.articlesService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single article by ID' })
  @ApiParam({ name: 'id', description: 'Numeric ID of the article', example: 1 })
  @ApiResponse({ status: 200, description: 'Article record found and returned.' })
  @ApiResponse({ status: 400, description: 'Invalid numeric ID provided' })
    @ApiResponse({status: 404, description: 'Article not found'})
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articlesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update an existing article by ID' })
  @ApiParam({ name: 'id', description: 'Numeric ID of the article', example: 1 })
  @ApiResponse({ status: 200, description: 'Article udpated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input or numeric ID' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleDto
  ): Promise<Article> {
    return this.articlesService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an article by ID' })
  @ApiParam({ name: 'id', description: 'Numeric ID of the article', example: 1 })
  @ApiResponse({ status: 204, description: 'Artical successfully removed' })
  @ApiResponse({ status: 400, description: 'Invalid numeric id' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.articlesService.remove(id)
  }
}