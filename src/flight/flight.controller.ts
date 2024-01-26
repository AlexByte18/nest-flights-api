import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FlightDto } from './dtos/flight.dto';
import { FlightService } from './flight.service';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PassengerService } from 'src/passenger/passenger.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Observable } from 'rxjs';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ClientProxyFlights } from 'src/common/proxy/client-proxy';
import { FlightMSG, PassengerMSG } from 'src/common/constants';

@ApiTags('flights')
@Controller('api/v1/flight')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FlightController {

    constructor(
        private readonly flightService: FlightService,
        private readonly passengerService: PassengerService,
        private readonly clientProxy: ClientProxyFlights,
    ) {}

    private _clientProxyFlight = this.clientProxy.clientProxyFlights();
    private _clientProxyPassengers = this.clientProxy.clientProxyPassengers();


    @Post()
    create(@Body() flightDto: FlightDto): Observable<IFlight>
    {
        return this._clientProxyFlight.send(FlightMSG.CREATE, flightDto);
    }

    @Get()
    findAll(): Observable<IFlight[]>
    {
        return this._clientProxyFlight.send(FlightMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IFlight>
    {
        return this._clientProxyFlight.send(FlightMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() flightDto: FlightDto): Observable<IFlight>
    {
        return this._clientProxyFlight.send(FlightMSG.UPDATE, {id, flightDto});
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any>
    {
        return this._clientProxyFlight.send(FlightMSG.DELETE, id);
    }

    @Post(':flightId/passenger/:passengerId')
    async addPassenger(
        @Param('flightId') flightId: string,
        @Param('passengerId') passengerId: string
    )
    {
        const passenger = await this._clientProxyPassengers
            .send(PassengerMSG.FIND_ONE, passengerId)
            .toPromise();
       
        
        if (!passenger) throw new HttpException('passenger not found', HttpStatus.NOT_FOUND);

        return this._clientProxyFlight.send(FlightMSG.ADD_PASSENGER, {
            flightId,
            passengerId
        })
    }
}
