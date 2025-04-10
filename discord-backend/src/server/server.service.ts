import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'
import { ApolloError } from 'apollo-server-express';
import { CreateServerDTo } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { MemberRole } from 'src/member/member.types';

@Injectable()
export class ServerService {
    constructor(private readonly prisma: PrismaService) { }

    async createServer(input: CreateServerDTo, imageUrl: string) {
        const profile = await this.prisma.profile.findUnique({
            where: {
                id: input.profileId,
            }
        });
        if (!profile) throw new BadRequestException('Profile not found');
        return this.prisma.server.create({
            data: {
                ...input,
                imageUrl,
                inviteCode: uuidv4(),

                channels: {
                    create: [
                        {
                            name: 'general',
                            profileId: profile.id,
                        }
                    ]
                },
                members: {
                    create: [
                        {
                            profileId: profile.id,
                            role: MemberRole.ADMIN

                        }
                    ]
                },
            },
            include: {
                members: true,
            }
        })
    }
    async getServer(id: number, email: string) {
        const profile = await this.prisma.profile.findUnique({
            where: { email }
        });
        if (!profile) return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');

        const server = this.prisma.server.findUnique({
            where: {
                id,
                members: {
                    some: {
                        profileId: profile.id,
                    },
                },
            },
        });
        if(!server) throw new ApolloError('Server not found', 'SERVER_NOT_FOUND');
    }
}
