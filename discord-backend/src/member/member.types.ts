import { ObjectType, Field } from '@nestjs/graphql';
import { Server } from 'src/server/types';
import { Profile } from 'src/profile/profile.types';
import { registerEnumType } from '@nestjs/graphql';

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

     @Field()
     email: string;

     @Field()
     createdAt: string;

     @Field()
     updatedAt: string;
}

export enum MemberRole {
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN',
    GUEST = 'GUEST',
}

    registerEnumType(MemberRole, {
    name: 'MemberRole',
    description: 'Describes the role of the user on the server'
})