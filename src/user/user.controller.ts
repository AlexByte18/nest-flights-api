import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('api/v1/user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
