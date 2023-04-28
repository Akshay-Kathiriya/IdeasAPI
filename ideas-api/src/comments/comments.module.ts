import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaEntity } from 'src/idea/idea.entity';
import { UserEntity } from 'src/user/user.entity';
import { CommentEntity } from './comment.entity';
import { CommentResolver } from './comment.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([IdeaEntity,UserEntity,CommentEntity])],
  controllers: [CommentsController],
  providers: [CommentsService, CommentResolver]
})
export class CommentsModule {}
