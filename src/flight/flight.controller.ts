import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FlightDto } from './dtos/flight.dto';
import { FlightService } from './flight.service';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PassengerService } from 'src/passenger/passenger.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('flights')
@Controller('api/v1/flight')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FlightController {

    constructor(
        private readonly flightService: FlightService,
        private readonly passengerService: PassengerService
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
        const passenger = await this.passengerService.findOne(passengerId);
        const flight = await this.flightService.findOne(flightId);

        if (!passenger) throw new HttpException('passenger not found', HttpStatus.NOT_FOUND);

        return this.flightService.addPassenger(flightId, passengerId);
    }
}
