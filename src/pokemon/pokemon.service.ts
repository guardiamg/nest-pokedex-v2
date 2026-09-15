import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto.js';
import { UpdatePokemonDto } from './dto/update-pokemon.dto.js';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { handleExceptions } from '../common/utils/utils.js';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    const filters = [
      { name : term.toLowerCase().trim() },
      ...(!isNaN(+term) ? [{ no : +term }] : []),
      ...(isValidObjectId(term) ? [{ _id : term }] : []),
    ]

    console.info('filter', filters);
    const pokemon = await this.pokemonModel.findOne({ $or: filters });
    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no ${ term } not found`);

    return pokemon;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      handleExceptions(error);
    }
  }

  async remove(_id: string) {
    const result = await this.pokemonModel.deleteOne({ _id });
    if (result.deletedCount === 0) throw new BadRequestException(`Pokemon with id ${ _id } not found`);
    return { message : 'Pokemon deleted successfully' };
  }
}
