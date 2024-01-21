import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any>
    {
        const user = await this.userService.findByUsername(username);

        const isValidPassword = await this.userService.checkPassword(password, user.password);

        if (user && isValidPassword) return user;

        return null;
    }

    async login(user: any) {
        const payload = {
            username: user.username,
            sub: user._id,
        };

        return { access_token: this.jwtService.sign(payload)};
    }

    async singUp(userDto: UserDto) {
        return this.userService.create(userDto);
    }
}
