import httpClientFactory from './http-client.factory';
import configService from '../config/config.service';
import UserService from './users.service';
import ArticleService from './articles.service';

export const httpClient = httpClientFactory(configService);

export const userService = new UserService(httpClient);
export const articleService = new ArticleService(httpClient);
