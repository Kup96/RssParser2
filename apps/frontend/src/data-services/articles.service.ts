import { AxiosInstance } from 'axios';

class ArticleService {
  private readonly baseRoute = 'articles';

  constructor(private readonly httpClient: AxiosInstance) {}

  public async findAll(params: {
    page: number;
    search: string;
    sort: string;
    pageSize: number;
  }) {
    return this.httpClient.get(`${this.baseRoute}`, {
      params,
    });
  }

  public async updateArticle(article: any) {
    console.log(article);
    return this.httpClient.patch(
      `${this.baseRoute}/editArticle/${article.id}`,
      { link: article.link, title: article.title, rssDate: article.rssDate }
    );
  }

  public async createArticle(article: any) {
    return this.httpClient.post(`${this.baseRoute}/createArticle`, article);
  }

  public async deleteArticle(articleId: string) {
    return this.httpClient.delete(`${this.baseRoute}/${articleId}`);
  }
}

export default ArticleService;
