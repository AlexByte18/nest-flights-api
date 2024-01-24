import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Passenger } from 'src/common/models/models';
import { PassengerSchema } from './schema/passenger.schema';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
        {
            name: Passenger.name,
            useFactory: () => PassengerSchema
        }
    ]),
    ProxyModule
    ],
  controllers: [PassengerController],
  providers: [PassengerService],
  exports: [PassengerService]
})
export class PassengerModule {}
