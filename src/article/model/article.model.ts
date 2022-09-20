import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Node } from '../pagination/models/node.model';

//Creation schema
@Entity()
@ObjectType()
export class Article extends Node {
  @Field(() => ID) // Pour dire au type ORM le type de valeur
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  author: User;

  @RelationId((self: Article) => self.author)
  readonly authorId: User['id'];
}
