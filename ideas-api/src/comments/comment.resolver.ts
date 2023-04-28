import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { CommentDTO } from './comment.dto';

@Resolver('comment')
export class CommentResolver {

  constructor(private commentService: CommentsService) {
  } 

  @Query()
  async comment(@Args('id') id: string) {
    return await this.commentService.show(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createComment(
    @Args('idea') ideaId: string,
    @Args('comment') comment: string,
    @Context('user') user,
  ) {
    const data: CommentDTO = { comment };
    const {id:userId} = user;
    return await this.commentService.crete(ideaId, userId, data);
  }


  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteComment(@Args('id')id:string, @Context('user') user){
    
    const { id: userId} = user;
    // console.log("id: ",id, "userId : ",userId);
    return await this.commentService.destroy(id, userId);
  }
}
