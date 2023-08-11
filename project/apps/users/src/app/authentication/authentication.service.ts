import { Injectable } from '@nestjs/common';
import { TaskUserMemoryRepository } from '../task-user/task-user-memory.repository';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly taskUserRepository: TaskUserMemoryRepository
    ){}
}
