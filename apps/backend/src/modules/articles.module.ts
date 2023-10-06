import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesService } from '../services/articles.service';
import { ArticleModel, ArticleSchema } from '../models/article.model';
import { ArticlesController } from '../controllers/articles.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ArticleModel.name,
        schema: ArticleSchema,
      },
    ]),
  ],
  providers: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
