import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ServerService } from './server/server.service';
import { ServerResolver } from './server/server.resolver';
import { ProfileModule } from './profile/profile.module';
import { ServerModule } from './server/server.module';



@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    GraphQLModule.forRootAsync({
      imports: [],
      inject: [],
      driver: ApolloDriver,
      useFactory: async () => {
        return {
          autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
          subscriptions: {}
        }
      }
    }),
    ProfileModule,
   ],
  controllers: [AppController],
  providers: [AppService, ServerService, ServerResolver, ServerModule],
})
export class AppModule {}
