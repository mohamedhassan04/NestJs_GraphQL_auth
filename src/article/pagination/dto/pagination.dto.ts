import {
  ArgsType,
  Field,
  InputType,
  Int,
  InterfaceType,
  registerEnumType,
} from '@nestjs/graphql';
import { Node } from '../models/node.model';

export enum SortDirection {
  /**l'ordre cronologique */
  ASC,
  DESC,
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
});

@InputType()
export class PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  createdAt?: SortDirection;
}

@ArgsType()
export class PaginationArgs {
  /** le nombre de page a skip */
  @Field(() => Int)
  skip: number;
  /**la taille de votre page */
  @Field(() => Int)
  take: number;
}

@InterfaceType()
export abstract class Pagination<N extends Node = Node> {
  @Field()
  totalCount: number;

  @Field(() => [Node])
  abstract nodes: N[];
}
