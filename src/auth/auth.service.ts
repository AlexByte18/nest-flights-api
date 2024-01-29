
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMSG } from 'src/common/constants';
import { ClientProxyFlights } from 'src/common/proxy/client-proxy';
import { UserDto } from 'src/user/dtos/user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly clientProxy: ClientProxyFlights,
        private readonly jwtService: JwtService,
    ) {}

    private _clientProxyUser = this.clientProxy.clientProxyUsers();

    async validateUser(username: string, password: string): Promise<any>
    {
        const user = await this._clientProxyUser.send(UserMSG.VALID_USER, {
            username,
            password
        }).toPromise();

        if (user) return user;

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
        return this._clientProxyUser.send(UserMSG.CREATE, userDto).toPromise();
    }
}
