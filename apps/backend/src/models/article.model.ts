import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IArticle } from '../interfaces/article.interface';

@Schema({ collection: 'articles', timestamps: true })
export class ArticleModel extends Document implements IArticle {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  rssDate: string;

  @Prop({})
  image: string;
}
export const ArticleSchema = SchemaFactory.createForClass(ArticleModel);
