import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter.js';
import { paginationDto } from './dtos/paginatio.dto.js';

@Module({
    providers : [ AxiosAdapter ],
    exports : [ AxiosAdapter ]
})
export class CommonModule {}
