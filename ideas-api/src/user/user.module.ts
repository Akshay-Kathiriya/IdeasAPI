import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { IdeaEntity } from 'src/idea/idea.entity';
import { CommentEntity } from 'src/comments/comment.entity';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity, IdeaEntity, CommentEntity])],
  controllers: [UserController],
  providers: [UserService, UserResolver, CommentsService]
})
export class UserModule {}
