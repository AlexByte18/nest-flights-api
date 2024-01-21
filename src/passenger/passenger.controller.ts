import { PassengerService } from './passenger.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PassengerDto } from './dtos/passenger.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('passengers')
@Controller('api/v1/passenger')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PassengerController {

    constructor(
        private readonly passengerService: PassengerService
    ){}

    @Post()
    create(@Body() passengerDto: PassengerDto)
    {
        return this.passengerService.create(passengerDto);
    }

    @Get()
    getAllPassengers()
    {
        return this.passengerService.getAll();
    }

    @Get(':id')
    show(@Param('id') id: string)
    {
        return this.passengerService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() passengerDto: PassengerDto)
    {
        console.log({passengerDto})
        return this.passengerService.update(id, passengerDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string)
    {
        this.passengerService.delete(id);

        return {
            status: HttpStatus.OK,
            message: 'deleted'
        }
    }
}
