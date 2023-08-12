import { ConflictException, Injectable } from '@nestjs/common';
import { TaskUserMemoryRepository } from '../task-user/task-user-memory.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '@project/shared/app-types';
import dayjs from 'dayjs';
import { AUTH_USER_EXISTS } from './authentication.constant';
import { TaskUserEntity } from '../task-user/task-user.entity';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly taskUserRepository: TaskUserMemoryRepository
    ){}
    public async register(dto: CreateUserDto) {
        const {firstname, lastname, email, city, dateBirth, password} = dto;
    
        const taskUser = {
          firstname, lastname, email, role: UserRole.User, city,
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
}
