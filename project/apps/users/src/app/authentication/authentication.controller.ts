import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';

@Controller('auth')
export class AuthenticationController {
    constructor(
      private readonly authService: AuthenticationService
    ) {}

    @Post('register')
    public async create(@Body() dto: CreateUserDto) {
      const newUser = await this.authService.register(dto);
      return fillObject(UserRdo, newUser);
    }
}
