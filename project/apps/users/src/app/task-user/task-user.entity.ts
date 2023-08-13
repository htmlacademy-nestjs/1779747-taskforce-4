import { User, City, UserRole } from '@project/shared/app-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './task-user.constant';

export class TaskUserEntity implements User {
    public _id?: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public city: City;
    public passwordHash: string;
    public role: UserRole;
    public avatar: string;
    public dateBirth: Date;

  constructor(taskUser: User) {
    this.fillEntity(taskUser);
  }

  public toObject() {
    return {
        _id: this._id,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        city: this.city,
        passwordHash: this.passwordHash,
        role: this.role,
        avatar: this.avatar,
        dateBirth: this.dateBirth
    };
  }

  public fillEntity(taskUser: User) {
    this._id = taskUser._id;
    this.avatar = taskUser.avatar;
    this.dateBirth = taskUser.dateBirth;
    this.email = taskUser.email;
    this.firstname = taskUser.firstname;
    this.lastname = taskUser.lastname;
    this.passwordHash = taskUser.passwordHash;
    this.role = taskUser.role;
  }

  public async setPassword(password: string): Promise<TaskUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}