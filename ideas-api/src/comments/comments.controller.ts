import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { CommentDTO } from './comment.dto';
import { User } from 'src/user/user.decorator';

@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService){}

    @Get('idea/:id')
    showCommentsByIdea(@Param('id') idea: string, @Query('page')page:number){
        return this.commentService.showByIdea(idea, page);
     }

    @Get('user/:id')
    showCommentsByUser(@Param('id') user: string, @Query('page')page:number){
        return this.commentService.showByUser(user, page);
    }

    @Post('idea/:id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    createComment(@Param('id')id: string, @User('id') user:string, @Body() data:CommentDTO){
        return this.commentService.crete(id, user, data);
    }

    @Get(':id')
    showComment(@Param('id') id:string){
        return this.commentService.show(id);
    }

    
    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroyComment(@Param('id') id: string, @User('id') user: string){
        return this.commentService.destroy(id, user);
    }


}
