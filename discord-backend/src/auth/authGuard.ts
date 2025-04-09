import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export class GraphqlAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {} 
        async canActivate(context: GqlExecutionContext) {
            const gqlCtx = context.getArgByIndex(2);
            const request: Request = gqlCtx.req;
            const token = this.extractToken(request);
            if(!token) {
                throw new UnauthorizedException;
            }
            try {
                const payload = await this.jwtService.verifyAsync(token, {
                    publicKey: process.env.JWT_PUBLIC_KEY,
                    algorithms: ['RS256'],
                });
                request['Profile'] = payload;

            } catch (error) {
                throw new UnauthorizedException('Not authorized');

            }
            return true;
        }
        private extractToken(request: Request): string | undefined  {
            return request.headers.authorization?.replace('Bearer', '');
        }
    }