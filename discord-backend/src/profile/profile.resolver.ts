import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateProfileDto } from './dto';
import { ProfileService } from './profile.service';
import { Profile } from './profile.types';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/authGuard';

@Resolver()
export class ProfileResolver {
    constructor(private readonly profileService: ProfileService){}
   
@UseGuards(GraphqlAuthGuard)
@Mutation(() => Profile)
async createProfile(@Args('input') input: CreateProfileDto) {
    return this.profileService.createProfile(input);
}
@Mutation(() => Profile)
async getProfiledById(@Args('id') profileId: number) {
    return this.profileService.getProfileById(profileId);
}

}