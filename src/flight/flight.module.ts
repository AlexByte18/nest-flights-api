import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight } from 'src/common/models/models';
import { FlightSchema } from './schema/flight.schema';
import { PassengerService } from 'src/passenger/passenger.service';
import { PassengerModule } from 'src/passenger/passenger.module';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
        {
            name: Flight.name,
            useFactory: () => FlightSchema.plugin(require ('mongoose-autopopulate'))
        }
    ]),
    PassengerModule,
    ProxyModule
  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
