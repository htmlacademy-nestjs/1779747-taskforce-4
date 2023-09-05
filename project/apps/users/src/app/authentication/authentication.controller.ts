import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
    constructor(
      private readonly authService: AuthenticationService,
      private readonly notifyService: NotifyService,
    ) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The new user has been successfully created.'
      })
    @Post('register')
    public async create(@Body() dto: CreateUserDto) {
      const newUser = await this.authService.register(dto);
      const { email, firstname, lastname } = newUser;
      await this.notifyService.registerSubscriber({ email, firstname, lastname })
      return fillObject(UserRdo, newUser);
    }

    @ApiResponse({
        type: LoggedUserRdo,
        status: HttpStatus.OK,
        description: 'User has been successfully logged.'
      })
      @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Password or Login is wrong.',
      })
    @Post('login')
    @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.createUserToken(verifiedUser);
    return fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }
}
