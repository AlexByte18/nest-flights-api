import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dtos/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('authentication')
@Controller('api/v1/auth')
export class AuthController {

    constructor (
        private readonly authService: AuthService,
    ) {
        console.log('auth controller');
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        console.log({req});
        return await this.authService.login(req.user);
    }

    @Post('singup')
    async singUp(@Body() userDto: UserDto) {
        return await this.authService.singUp(userDto);
    }

    @Get('test')
    test() {
        return 'test';
    }
}
