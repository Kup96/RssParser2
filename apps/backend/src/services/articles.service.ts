import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleModel } from '../models/article.model';
import { Model, UpdateWriteOpResult } from 'mongoose';
import DeleteResult from 'mongoose';
import {
  ArticleDto,
  ArticleFromRssDto,
  ArticlesWithSortDto,
} from '../../../libs/shared/dto/article.dto';
import {
  FilterDto,
  PaginationDto,
} from '../../../libs/shared/dto/pagination.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(ArticleModel.name)
    private readonly articleModel: Model<ArticleModel>
  ) {}

  private imageReg: RegExp =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.,_\+~#=]{1,512}\.[a-zA-Z0-9()]{1,15}\b([-a-zA-Z0-9()!@:,%_\+.~#?&\/\/=]*)/gm;

  async pushAllArticles(articles: ArticleFromRssDto[]): Promise<void> {
    for (const article of articles) {
      let image = article.content.match(this.imageReg)[0];

      const findFeedInDb = await this.articleModel.findOne({
        link: article.link,
      });

      if (findFeedInDb) {
        continue;
      }

      const newFeed: ArticleModel = await new this.articleModel({
        title: article.title,
        link: article.link,
        rssDate: article.pubDate,
        image: image,
      });

      await newFeed.save();
    }
  }

  async findArticles(
    filter: FilterDto
  ): Promise<ArticlesWithSortDto | ErrorConstructor> {
    const page = parseInt(filter.page) || 1;
    const pageSize = parseInt(filter.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const sortOrder = filter.sort.direction === 'desc' ? -1 : 1;
    const sortField = filter.sort.name;
    const searchQuery = filter.search || '';
    const searchFilter = { title: { $regex: searchQuery, $options: 'i' } };

    try {
      const articles = await this.articleModel
        .find(searchFilter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(pageSize);

      const totalCount = await this.articleModel.countDocuments(searchFilter);

      return {
        articles,
        pagination: {
          currentPage: page,
          pageSize,
          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
        },
      };
    } catch (e) {
      console.log(e);
      return Error;
    }
  }

  async createArticle(article: ArticleDto): Promise<void> {
    const findFeedInDb = await this.articleModel.findOne({
      link: article.link,
    });

    if (findFeedInDb) {
      return;
    }

    const newFeed: ArticleModel = await new this.articleModel({
      title: article.title,
      link: article.link,
      rssDate: article.rssDate,
      image: article.image,
    });

    await newFeed.save();
  }

  async editArticle(
    article: ArticleDto,
    id: string
  ): Promise<UpdateWriteOpResult> {
    const findFeedInDb = await this.articleModel.findOne({ _id: id });
    console.log(findFeedInDb);
    if (!findFeedInDb) {
      return;
    }

    return await this.articleModel.updateOne({ _id: id }, { $set: article });
  }
  // DeleteResult
  async removeArticle(id: string): Promise<any> {
    const findFeedInDb = await this.articleModel.findOne({ _id: id });

    if (!findFeedInDb) {
      return;
    }

    return await this.articleModel.deleteOne({ _id: id });
  }
}
