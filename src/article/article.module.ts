import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ArticleService } from './article.service';
import { Article } from './model/article.model';
import { ArticleQueriesResolver } from './resolvers/article-queries.resolver';
import { ArticleFieldResolver } from './resolvers/article.fields.resolver';
import { ArticleMutationsResolver } from './resolvers/article.mutations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), UserModule],
  providers: [
    ArticleService,
    ArticleMutationsResolver,
    ArticleQueriesResolver,
    ArticleFieldResolver,
  ],
})
export class ArticleModule {}
