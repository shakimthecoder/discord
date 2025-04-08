import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

export class GraphqlAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
        async CanActivate(context: GqlExecutionContext){
            const gqlCtx = context.getArgByIndex(2);
            const request: Request = gqlCtx.req;
            const token = this.extractToken(request);
            if(!token) {
                throw new UnauthorizedException;
            }
        }
    }
}