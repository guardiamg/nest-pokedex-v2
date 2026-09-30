import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PokemonService } from './pokemon.service.js';
import { PokemonController } from './pokemon.controller.js';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [ConfigModule, MongooseModule.forFeature([{ name : Pokemon.name, schema : PokemonSchema }])],
  exports: [MongooseModule]
})
export class PokemonModule {}
