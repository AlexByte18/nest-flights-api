import { Passenger } from 'src/common/models/models';
import { FlightDto } from './dtos/flight.dto';
import { FlightService } from './flight.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('api/v1/flight')
export class FlightController {

    constructor(
        private readonly flightService: FlightService
    ) {}


    @Post()
    create(@Body() flightDto: FlightDto) {
        return this.flightService.create(flightDto);
    }

    @Get()
    findAll() {
        return this.flightService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.flightService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() flightDto: FlightDto) {
        return this.flightService.update(id, flightDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.flightService.delete(id);
    }

    @Post(':flightId/passenger/:passengerId')
    async addPassenger(
        @Param('flightId') flightId: string,
        @Param('passengerId') passengerId: string
    ) {
        return this.flightService.addPassenger(flightId, passengerId);
    }
}
