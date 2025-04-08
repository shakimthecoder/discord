import { ObjectType, Field } from '@nestjs/graphql';
import { Server } from 'src/server/types';
import { Profile } from 'src/profile/profile.types';
@ObjectType()
export class Member {
    @Field()
    id: number;

    @Field(() => Profile, { nullable: true})
    profile: Profile

    @Field()
    profileId: number;

    @Field(() => Server, { nullable: true})
     server: Server
}