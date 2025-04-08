import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Member } from 'src/member/member.types';
import { Profile } from 'src/profile/profile.types';

@ObjectType()
export class Channel {
    @Field()
    id: number;

    @Field({ nullable: true})
    name: string;

    @Field(() => ChannelType)
    type: ChannelType;

    @Field()
     createdAt: string;

     @Field()
     updatedAt: string;

     @Field(() => [Member], { nullable: true})
     members: Member[];
}

export enum ChannelType {
    TEXT = 'TEXT',
    VOICE = 'VOICE',
    VIDEO = 'VIDEO',
 }

registerEnumType(ChannelType, {
    name: 'ChannelType',
    description: 'Describes the type of channel on the discord server'
});

@ObjectType()
export class Server {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    imageUrl: string;

    @Field({ nullable: true })
    inviteCode: string;

    @Field()
    profileId: number;

    @Field(() => Profile , { nullable: true })
    profile: Profile;

    @Field(() => [Member] , { nullable: true })
    member: Member[];

    @Field(() => [Channel] , { nullable: true })
    channel: Channel [];


}