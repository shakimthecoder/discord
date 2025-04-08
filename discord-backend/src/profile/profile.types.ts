import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Server, Channel } from '../server/types';

@ObjectType()
export class Profile {
    @Field()
    id: number;

    @Field({nullable: true})
    email: string;
   
    @Field({nullable: true})
    name: string;

    @Field(() => [Server], { nullable: 'itemsAndList'})
    servers: Server[];

    @Field()
    imageUrl: string;

    @Field(() => [Channel], { nullable: 'itemsAndList'})
    channels: Channel[];
}