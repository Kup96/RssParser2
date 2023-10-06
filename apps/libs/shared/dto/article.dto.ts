import { IsNotEmpty, IsUrl } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class ArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  rssDate: string;

  @IsUrl()
  image: string;
}

export class ArticleFromRssDto {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  id: string;
  isoDate: string;
}

export interface ArticlesWithSortDto {
  articles: ArticleDto[];
  pagination: PaginationDto;
}
