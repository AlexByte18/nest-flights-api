import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/v1/user')
export class UserController {

    constructor( 
        private readonly userService: UserService
    ) {}

    @Post()
    @ApiOperation({summary: 'create a new user'})
    create(@Body() userDto: UserDto)
    {
        return this.userService.create(userDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string)
    {
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userDto: UserDto)
    {
        return this.userService.update(id, userDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string)
    {
        return this.userService.delete(id);
    }
}
