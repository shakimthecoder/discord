import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class ServerResolver {
    @Query(() => String)
    
     async greeting() {
        return "Hello from the Discord Backend Server";
     }
}
