import {
  Controller,
  Get,
  Param,
  Request,
  Query,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArticlesWithSortDto } from '../../../libs/shared/dto/article.dto';
import { ArticlesService } from '../services/articles.service';
import { UpdateWriteOpResult } from 'mongoose';
import { FilterDto } from '../../../libs/shared/dto/pagination.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getArticles(
    @Request() request,
    @Query() filter: FilterDto
  ): Promise<ArticlesWithSortDto | ErrorConstructor> {
    return await this.articlesService.findArticles(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Post('createArticle')
  async createArticle(@Request() request, @Body() body): Promise<void> {
    return await this.articlesService.createArticle(body);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('editArticle/:id')
  async editArticle(
    @Request() request,
    @Body() body,
    @Param('id') id
  ): Promise<UpdateWriteOpResult> {
    return await this.articlesService.editArticle(body, id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeArticle(@Param('id') id): Promise<void> {
    return await this.articlesService.removeArticle(id);
  }
}
