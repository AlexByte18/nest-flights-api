import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/common/models/models';
import { UserSchema } from './schema/user.schema';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          return UserSchema;
        },
      },
    ]),
    ProxyModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
