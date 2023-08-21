import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TaskUserMemoryRepository } from '../task-user/task-user-memory.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '@project/shared/app-types';
import dayjs from 'dayjs';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { TaskUserEntity } from '../task-user/task-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigType } from '@nestjs/config';
import { dbConfig } from '@project/config/config-users';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly taskUserRepository: TaskUserMemoryRepository,
        private readonly configService: ConfigService,
        @Inject(dbConfig.KEY)
        private readonly databaseConfig: ConfigType<typeof dbConfig>,
        ) {}
    public async register(dto: CreateUserDto) {
        const {firstname, lastname, email, city, dateBirth, password} = dto;
    
        const taskUser = {
          firstname, lastname, email, role: UserRole.Performer, city,
          avatar: '', dateBirth: dayjs(dateBirth).toDate(),
          passwordHash: ''
        };
    
        const existUser = await this.taskUserRepository
          .findByEmail(email);
    
        if (existUser) {
          throw new ConflictException(AUTH_USER_EXISTS);
        }
    
        const userEntity = await new TaskUserEntity(taskUser)
          .setPassword(password)
    
        return this.taskUserRepository
          .create(userEntity);
      }

      public async verifyUser(dto: LoginUserDto) {
        const {email, password} = dto;
        const existUser = await this.taskUserRepository.findByEmail(email);
    
        if (!existUser) {
          throw new NotFoundException(AUTH_USER_NOT_FOUND);
        }
    
        const blogUserEntity = new TaskUserEntity(existUser);
        if (!await blogUserEntity.comparePassword(password)) {
          throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
        }
    
        return blogUserEntity.toObject();
      }
    
      public async getUser(id: string) {
        return this.taskUserRepository.findById(id);
      }
}
