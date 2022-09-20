import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Article } from '../model/article.model';
import { ArticleCreateInput, ArticleCreateOutput } from './article-create-dto';

@InputType()
/**@desc extends c'est pour importer tout les champs de table create */
export class ArticleUpdateInput extends ArticleCreateInput {}

@ObjectType()
export class ArticleUpdateOutput extends ArticleCreateOutput {}
