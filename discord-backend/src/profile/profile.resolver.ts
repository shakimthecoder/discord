import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateProfileDto } from './dto';
import { ProfileService } from './profile.service';
import { Profile } from './profile.types';

@Resolver()
export class ProfileResolver {
    constructor(private readonly profileService: ProfileService){}
   

@Mutation(() => Profile)
async createProfile(@Args('input') input: CreateProfileDto) {
    return this.profileService.createProfile(input);
}
@Mutation(() => Profile)
async getProfiledById(@Args('id') profileId: number) {
    return this.profileService.getProfileById(profileId);
}

}