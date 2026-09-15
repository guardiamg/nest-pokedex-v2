import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

export function handleExceptions(error : any) {
    if (error.code === 11000) throw new BadRequestException(`Pokemon already exists in db ${ JSON.stringify(error.keyValue) }`);
    console.log(error);
    throw new InternalServerErrorException('Unexpected error creating pokemon, check server logs');
}