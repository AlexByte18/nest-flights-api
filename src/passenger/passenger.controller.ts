import { UserDto } from './../user/dtos/user.dto';
import { PassengerService } from './passenger.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PassengerDto } from './dtos/passenger.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClientProxyFlights } from 'src/common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { IPassenger } from './interfaces/passenger.interface';
import { PassengerMSG } from 'src/common/constants';

@ApiTags('passengers')
@Controller('api/v1/passenger')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PassengerController {

    constructor(
        private readonly passengerService: PassengerService,
        private readonly clientProxy: ClientProxyFlights
    ){}

    private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();

    @Post()
    create(@Body() passengerDto: PassengerDto): Observable<IPassenger>
    {
        return this._clientProxyPassenger.send(PassengerMSG.CREATE, passengerDto);
    }

    @Get()
    getAllPassengers(): Observable<IPassenger[]>
    {
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
    }

    @Get(':id')
    show(@Param('id') id: string): Observable<IPassenger>
    {
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() passengerDto: PassengerDto): Observable<IPassenger>
    {
        return this._clientProxyPassenger.send(PassengerMSG.UPDATE, {id, UserDto});
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any>
    {
        return this._clientProxyPassenger.send(PassengerMSG.DELETE, id);
    }
}
