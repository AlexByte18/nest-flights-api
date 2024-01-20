import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight } from 'src/common/models/models';
import { FlightSchema } from './schema/flight.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
        {
            name: Flight.name,
            useFactory: () => FlightSchema.plugin(require ('mongoose-autopopulate'))
        }
    ])
  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
