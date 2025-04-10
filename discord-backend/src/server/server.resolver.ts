import { Resolver, Query } from '@nestjs/graphql';
import { Server } from './types'
import { Args } from '@nestjs/graphql';

@Resolver()
export class ServerResolver {
    @Query(() => [Server])
    async getServers(
      @Args('profileId') profileId: number,
    ){}
    
}
