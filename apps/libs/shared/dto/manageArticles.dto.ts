export interface CreateArticleDto {
  title: string;
  link: string;
  rssDate: string;
}

export interface UpdateArticleDto {
  id: string;
  title: string;
  link: string;
  rssDate: string;
}
