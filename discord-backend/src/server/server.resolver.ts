import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { Server } from './types'
import { Args, Context } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { ServerService } from './server.service';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { CreateServerDTo } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { GraphqlAuthGuard } from 'src/auth/authGuard';
import { UseGuards } from '@nestjs/common';
import { join } from 'path';


@Resolver()
export class ServerResolver {
    constructor(private readonly serverService: ServerService){}
    @Query(() => [Server])
    async getServers(
      @Args('profileId') profileId: number,
      @Context() ctx: { req: Request }
    ){
      if(!ctx.req?.profile.email)
         return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');
        return this.serverService.getServersByProfileEmailOfMember(
            ctx.req?.profile.email,
        );
      }
      @Mutation(() => Server)
      async createServer(
         @Args('input') input: CreateServerDTo,
         @Args('file', { type: () => GraphQLUpload, nullable: true}) file: GraphQLUpload,
      ){
         const imageUrl = await this.storeImageAndGetUrl(file);
      }
      private async storeImageAndGetUrl(file: GraphQLUpload) {
         const { createReadStream, filename } = await file;
         const uniqueFileName = uuidv4('filename');
         const imagePath = join(process.cwd(), 'public', 'images', uniqueFileName);
         const imageUrl = `{process.env.APP_URL}/images/{uniqueFileName}`;
      }
    }
    

