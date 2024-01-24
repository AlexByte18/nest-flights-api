import { UserMSG } from './../common/constants';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClientProxyFlights } from 'src/common/proxy/client-proxy';
import { IUser } from 'src/common/interfaces/user.interface';
import { Observable } from 'rxjs';

@ApiTags('users')
@Controller('api/v1/user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {

    constructor( 
        private readonly userService: UserService,
        private readonly clientProxy: ClientProxyFlights,
    ) {}

    private _clientProxyUser = this.clientProxy.clientProxyUsers();

    @Post()
    @ApiOperation({summary: 'create a new user'})
    create(@Body() userDto: UserDto): Observable<IUser>
    {
        return this._clientProxyUser.send(UserMSG.CREATE, userDto);
    }

    @Get()
    findAll(): Observable<IUser[]>
    {
        return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IUser>
    {
        return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userDto: UserDto): Observable<IUser>
    {
        return this._clientProxyUser.send(UserMSG.UPDATE, {id, userDto});
    }

    @Delete(':id')
    delete(@Param('id') id: string)
    {
        return this._clientProxyUser.send(UserMSG.DELETE, id);
    }
}
