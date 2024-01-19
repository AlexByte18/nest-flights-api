import { IUser } from 'src/common/interfaces/user.interface';
import { UserDto } from './dtos/user.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/models/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly model:Model<IUser>
    ) {}


    async hashPassword(password: string): Promise<string> 
    {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async create( userDto: UserDto): Promise<IUser>
    {
        const hash = await this.hashPassword(userDto.password);
        const newUser = new this.model({...userDto, password: hash});

        return await newUser.save();
    }

    async findAll(): Promise<IUser[]>
    {
        return await this.model.find();
    }

    async findOne(id: string): Promise<IUser>
    {
        return await this.model.findById(id);
    }

    async update(id: string, userDto: UserDto): Promise<IUser>
    {
        const hash = await this.hashPassword(userDto.password);
        const user = {...userDto, password: hash};

        return await this.model.findByIdAndUpdate(id, user, {new: true});
    }

    async delete(id: string)
    {
        await this.model.findByIdAndDelete(id);
        return {status: HttpStatus.OK, message: 'deleted'};
    }
}
