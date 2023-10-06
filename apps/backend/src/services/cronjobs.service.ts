import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import Parser from 'rss-parser';
import { ArticlesService } from './articles.service';

@Injectable()
export class CronjobsService {
  constructor(private readonly articlesService: ArticlesService) {}

  private parser: Parser<any> = new Parser();

  @Cron('* * * * *')
  async articlesParser() {
    const feed = await this.parser.parseURL('https://www.reddit.com/.rss');
    await this.articlesService.pushAllArticles(feed.items);
  }
}
