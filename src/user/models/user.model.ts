import { Field, ObjectType } from '@nestjs/graphql';
import { Article } from 'src/article/model/article.model';
import { Node } from 'src/article/pagination/models/node.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class User extends Node {
  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string | null;

  @OneToMany(() => Article, (target) => target.author)
  articles: Article[];
}
