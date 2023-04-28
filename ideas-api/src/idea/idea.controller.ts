import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { IdeaService } from './idea/idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { User } from 'src/user/user.decorator';

@Controller('api/ideas')
export class IdeaController {
    private logger = new Logger('IdeaController')

    constructor(private ideaService: IdeaService){}

    private logData(options: any){
        options.user && this.logger.log('USER' + JSON.stringify(options.user));
        options.body && this.logger.log('BODY' + JSON.stringify(options.body));
        options.id && this.logger.log('IDEA' + JSON.stringify(options.id));
    }

    @Get()
    showAllIdeas(@Query('page') page: number){
        return this.ideaService.showAll(page);
    }

    @Get('/newest')
    showNewestIdeas(@Query('page') page: number){
        return this.ideaService.showAll(page,true);
    }

    @Post()
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    createIdea(@User('id') user:string,@Body() data:IdeaDTO){
        console.log(user,"-------------------------------controller");
        this.logData({ user, data });
        return this.ideaService.create(user, data);
    }
    
    @Get(':id')
    readIdea(@Param('id')id:string){
        this.logData({id});
        return this.ideaService.read(id);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    updateIdea(@Param('id')id:string, @User('id') user, @Body()data: Partial<IdeaDTO>){
        console.log("-----------controller-------")
        this.logData({id, user, data})
        
        return this.ideaService.update(id,user, data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroyIdea(@Param('id') id: string,@User('id') user:string){
        this.logData({id, user})
        return this.ideaService.destroy(id, user);
    }

    @Post(':id/upvote')
    @UseGuards(new AuthGuard())
    upvoteIdea(@Param('id') id: string, @User('id') user: string){
        this.logData({id, user});
        return this.ideaService.upvote(id, user);
    }

    @Post(':id/downvote')
    @UseGuards(new AuthGuard())
    downvoteIdea(@Param('id') id: string, @User('id') user: string){
        this.logData({id, user});
        return this.ideaService.downvote(id, user);
    }

    @Post(':id/bookmark')
    @UseGuards(new AuthGuard())
    bookmarkIdea(@Param('id') id:string, @User('id') user: string){
        this.logData({id, user})
        return this.ideaService.bookmark(id, user);
    }

    @Delete(':id/bookmark')
    @UseGuards(new AuthGuard())
    unbookmarkIdea(@Param('id') id:string, @User('id') user: string){
        this.logData({id, user})
        return this.ideaService.unbookmark(id, user);
    }
}
