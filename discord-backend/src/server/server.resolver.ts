import { Resolver, Query } from '@nestjs/graphql';
import { Server } from './types'
import { Args, Context } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Resolver()
export class ServerResolver {
    @Query(() => [Server])
    async getServers(
      @Args('profileId') profileId: number,
      @Context() ctx: { req: Request }
    ){
      if(!ctx.req?.profile.email){
         return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');
      }
    }
    
}
