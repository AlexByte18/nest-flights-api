import { PassengerDto } from './dtos/passenger.dto';
import { Injectable } from '@nestjs/common';
import { IPassenger } from './interfaces/passenger.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Passenger } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {

    constructor(
        @InjectModel(Passenger.name) private readonly model:Model<IPassenger>,
    ) {}

    async create(passengerDto: PassengerDto): Promise<IPassenger>
    {   
        const passenger = new this.model(passengerDto);

        return  await passenger.save();
    }

    async getAll(): Promise<IPassenger[]>
    {
        return await this.model.find();
    }

    async findOne(id: string): Promise<IPassenger>
    {
        return await this.model.findById(id);
    }

    async update(id: string, passengerDto: PassengerDto): Promise<IPassenger>
    {
        return await this.model.findByIdAndUpdate(id, passengerDto, {
            new: true,
            returnNewDocument: true
        });
    }

    async delete(id: string): Promise<IPassenger>
    {
        return await this.model.findByIdAndDelete(id);
    }
}
