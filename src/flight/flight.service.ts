import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightDto } from './dtos/flight.dto';
import { Injectable, Delete, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flight } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class FlightService {

    constructor(
        @InjectModel(Flight.name) private readonly model: Model<IFlight>
    ) {}


    async create(flightDto: FlightDto): Promise<IFlight>
    {
        const flight = new this.model(flightDto);

        return await flight.save();
    }

    async getAll(): Promise<IFlight[]>
    {
        return await this.model.find();
    }

    async findOne(id: string): Promise<IFlight>
    {
        return await this.model.findById(id).populate('passengers');
    }

    async update(id: string, flightDto: FlightDto): Promise<IFlight>
    {
        return await this.model.findByIdAndUpdate(id, flightDto, { new: true });
    }

    async delete(id: string) 
    {
        await this.model.findByIdAndDelete(id);
        
        return {
            status: HttpStatus.OK,
            message: 'deleted'
        };
    }

    async addPassenger(flightId: string, passengerId: string): Promise<IFlight>
    {
        return await this.model.findByIdAndUpdate(
            flightId, {
                $addToSet: {passengers: passengerId}
            },
            {new: true}
        ).populate('passengers');
    }
}
