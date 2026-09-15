import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module.js';

const configModule = ConfigModule.forRoot();

@Module({
  imports: [
    configModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    PokemonModule,
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
