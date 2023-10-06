import { Module } from '@nestjs/common';
import { CronjobsService } from '../services/cronjobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModel, ArticleSchema } from '../models/article.model';
import { ArticlesService } from '../services/articles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ArticleModel.name,
        schema: ArticleSchema,
      },
    ]),
  ],
  providers: [CronjobsService, ArticlesService],
})
export class CronjobsModule {}
