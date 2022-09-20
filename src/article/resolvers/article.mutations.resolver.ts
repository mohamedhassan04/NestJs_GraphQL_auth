import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { JWTPayload } from 'src/auth/auth.service';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ArticleService } from '../article.service';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from '../dto/article-create-dto';
import { ArticleDeleteOutput } from '../dto/article-delete-dto';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from '../dto/article-update-dto';
import { Article } from '../model/article.model';

@Resolver(Article)
export class ArticleMutationsResolver {
  constructor(private readonly articleService: ArticleService) {}
  /** Pour proteger nos données */
  @UseGuards(JwtAuthGuard)
  /**@desc c'est pour créer un article dans la path de GraphQL */
  @Mutation(() => ArticleCreateOutput)
  async articleCreate(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: ArticleCreateInput,
  ) {
    return this.articleService.articleCreate(user, input);
  }
  /** Pour proteger nos données */
  @UseGuards(JwtAuthGuard)
  /**@desc c'est pour update un article dans la path de GraphQL */
  @Mutation(() => ArticleUpdateOutput)
  async articleUpdate(
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
    @Args('input') input: ArticleUpdateInput,
  ) {
    return this.articleService.articleUpdate(articleId, input);
  }
  /** Pour proteger nos données */
  @UseGuards(JwtAuthGuard)
  /**@desc c'est pour delete un article dans la path de GraphQL */
  @Mutation(() => ArticleDeleteOutput)
  async articleDelete(
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
  ) {
    return this.articleService.articleDelete(articleId);
  }
}
