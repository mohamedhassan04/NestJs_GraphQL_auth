import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JWTPayload } from 'src/auth/auth.service';
import { User } from 'src/user/models/user.model';
import { Repository } from 'typeorm';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from './dto/article-create-dto';
import { ArticleDeleteOutput } from './dto/article-delete-dto';
import {
  ArticlePagination,
  ArticlePaginationArgs,
} from './dto/article-pagination-dto';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from './dto/article-update-dto';
import { Article } from './model/article.model';
import { SortDirection } from './pagination/dto/pagination.dto';

@Injectable()
export class ArticleService {
  constructor(
    //Permettre de faire des actions dans le base de données sur l'entité article
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}
  // Create Article
  async articleCreate(
    user: JWTPayload,
    input: ArticleCreateInput,
  ): Promise<ArticleCreateOutput> {
    /**@desc create un nouveau article */
    const article = this.articleRepository.create(input);
    article.author = new User();
    article.author.id = user.id;
    /**@desc save un nouveau article */
    await article.save();

    /**@desc retourner un objet article qui contient mon article */
    return { article };
  }

  // Update Article
  async articleUpdate(
    articleId: Article['id'],
    input: ArticleUpdateInput,
  ): Promise<ArticleUpdateOutput> {
    /**@desc update un nouveau article */
    const article = await this.articleRepository.findOneOrFail(articleId);

    /** les inputs qui on va update */
    article.title = input.title;
    article.description = input.description;
    article.image = input.image;

    /**@desc save un nouveau article */
    await article.save();

    /**@desc retourner un objet article qui contient mon article */
    return { article };
  }

  // Delete Article
  async articleDelete(articleId: Article['id']): Promise<ArticleDeleteOutput> {
    /**@desc find l'article  */
    const article = await this.articleRepository.findOneOrFail(articleId);

    /**@desc remove  article */
    await article.remove();

    /**@desc retourner un objet article qui contient mon article */
    return { articleId };
  }

  //Get all articles
  async articlesPagination(
    args: ArticlePaginationArgs,
  ): Promise<ArticlePagination> {
    /** on va utiliser un query builder */
    const qb = this.articleRepository.createQueryBuilder('article');
    qb.take(args.take);
    qb.skip(args.skip);
    if (args.sortBy) {
      if (args.sortBy.createdAt !== null) {
        qb.addOrderBy(
          'article.createdAt',
          args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.title !== null) {
        qb.addOrderBy(
          'article.title',
          args.sortBy?.title === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
    }
    const [nodes, totalCount] = await qb.getManyAndCount();
    // /** c'est un logic basique de typeORM */
    // const [nodes, totalCount] = await this.articleRepository.findAndCount({
    //   skip: args.skip,
    //   take: args.take,
    //   order: {
    //     createdAt:
    //       args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
    //     title: args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
    //   },
    // });
    return { nodes, totalCount };
  }
}
