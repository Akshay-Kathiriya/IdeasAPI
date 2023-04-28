import { Resolver,Query, Args, Parent, Mutation, Context, ResolveField } from  "@nestjs/graphql"
import { UserService } from "./user.service"
import { CommentsService } from "src/comments/comments.service";
import { UserDTO } from "./user.dto";
import { AuthGuard } from "src/shared/auth.gaurd";
import { UseGuards } from "@nestjs/common";

@Resolver('User')
export class UserResolver{
   constructor(private userService:UserService, private commentService: CommentsService){}
    @Query()
   async users(@Args('page')page: number){
        return await this.userService.showAll(page)
    }

    @Query()
    async user(@Args('username')username: string){
        return await this.userService.read(username);
    }

    @Query()
    @UseGuards(new AuthGuard())
    async whoami(@Context('user') user){
        const { username } =user;
        return await this.userService.read(username);
    }

    @Mutation()
    async login(@Args('username') username: string, @Args('password') password: string){
        const user: UserDTO = {username, password};
        return await this.userService.login(user);
    }

    @Mutation()
    async register(@Args('username') username: string, @Args('password') password: string){
        const user:UserDTO = { username, password};
        return await this.userService.register(user);
    }

    @ResolveField()
    async comments(@Parent() user){
        const {id} = user;
        return await this.commentService.showByUser(id);
    }
}