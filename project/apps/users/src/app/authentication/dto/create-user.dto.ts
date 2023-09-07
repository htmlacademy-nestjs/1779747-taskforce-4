import { ApiProperty } from "@nestjs/swagger";
import { City, UserRole } from "@project/shared/app-types";
import { IsEmail, IsEnum, IsString, MinLength, MaxLength, MaxDate } from 'class-validator';
import { AUTH_USER_DATE_BIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID, 
  AUTH_USER_CITY_NOT_VALID, AUTH_USER_PASSWORD_MIN_LENGTH, 
  AUTH_USER_PASSWORD_MAX_LENGTH, AUTH_USER_NAME_MIN_LENGTH , AUTH_USER_NAME_MAX_LENGTH  } from '../authentication.constant';
import { Transform } from "class-transformer";
import dayjs from "dayjs";


export class CreateUserDto {
    @ApiProperty({
        description: 'User first name',
        example: 'Keks',
      })
    @IsString()
    @MinLength(3, {message: AUTH_USER_NAME_MIN_LENGTH})
    @MaxLength(50, {message: AUTH_USER_NAME_MAX_LENGTH})  
    public firstname: string;

    @ApiProperty({
        description: 'User last name',
        example: 'Ivanov'
      })
    @IsString()
    @MinLength(3, {message: AUTH_USER_NAME_MIN_LENGTH})
    @MaxLength(50, {message: AUTH_USER_NAME_MAX_LENGTH})
    public lastname: string;

    @ApiProperty({
        description: 'User unique address',
        example: 'user@user.ru',
      })
    @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
    public email: string;

    @ApiProperty({
        description: 'User city',
        example: 'Москва'
      })
    @IsEnum(City, { message:  AUTH_USER_CITY_NOT_VALID })  
    public city: City;

    @ApiProperty({
        description: 'User birth date',
        example: '1981-03-12',
      })
    @Transform(({ value }) => new Date(value))
    @MaxDate(dayjs(new Date()).subtract(18, 'year').toDate(), { message: AUTH_USER_DATE_BIRTH_NOT_VALID })
    public dateBirth: string;

    @ApiProperty({
        description: 'User password',
        example: '123456'
      })
    @IsString()
    @MinLength(6, {message: AUTH_USER_PASSWORD_MIN_LENGTH})
    @MaxLength(12, {message: AUTH_USER_PASSWORD_MAX_LENGTH})  
    public password: string;

    @ApiProperty({
      description: 'User role',
      example: 'client'
    })
    @IsString()
    public role: UserRole;

    @ApiProperty({
      description:'User avatar',
      example:  '/images/user.png'
    })
    @IsString()
    public avatar?: string;
}