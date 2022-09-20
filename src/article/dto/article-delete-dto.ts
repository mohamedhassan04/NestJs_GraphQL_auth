import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Article } from '../model/article.model';

@ObjectType()
export class ArticleDeleteOutput {
  @Field(() => ID)
  articleId: Article['id'];
}
