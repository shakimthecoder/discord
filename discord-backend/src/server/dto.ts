import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateServerDTo {
    @Field()
    @IsString()
    name: string;

    @Field()
    profileId: number;
}