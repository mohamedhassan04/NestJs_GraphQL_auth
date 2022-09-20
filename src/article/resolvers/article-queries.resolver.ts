import { Args, Query, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import {
  ArticlePagination,
  ArticlePaginationArgs,
} from '../dto/article-pagination-dto';
import { Article } from '../model/article.model';

@Resolver(Article)
export class ArticleQueriesResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => ArticlePagination)
  async articlesPagination(@Args() args: ArticlePaginationArgs) {
    return this.articleService.articlesPagination(args);
  }
}
