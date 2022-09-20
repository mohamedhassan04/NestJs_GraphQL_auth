import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { Article } from '../model/article.model';
import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
} from '../pagination/dto/pagination.dto';

@InputType()
export class ArticlesPaginationSortBy extends PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  title?: SortDirection;
}

@ArgsType()
export class ArticlePaginationArgs extends PaginationArgs {
  @Field(() => ArticlesPaginationSortBy, { nullable: true })
  sortBy?: ArticlesPaginationSortBy;
}

@ObjectType()
export class ArticlePagination extends Pagination {
  @Field(() => [Article])
  nodes: Article[];
}
