import { IsNotEmpty } from "class-validator";
import { IdeaRO } from "src/idea/idea.dto";
import { IdeaEntity } from "src/idea/idea.entity";
import { UserEntity } from "./user.entity";

export class UserDTO{
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}


export class UserRO{
    id: string
    username: string
    created:Date
    token?:string
    ideas?:IdeaEntity[]
    bookmarks?:IdeaEntity[]
}