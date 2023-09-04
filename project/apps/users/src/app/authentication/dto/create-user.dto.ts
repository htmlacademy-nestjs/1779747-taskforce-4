import { ApiProperty } from "@nestjs/swagger";
import { City } from "@project/shared/app-types";
import { IsEmail, IsISO8601, IsEnum, IsString } from 'class-validator';
import { AUTH_USER_DATE_BIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID, AUTH_USER_CITY_NOT_VALID  } from '../authentication.constant';


export class CreateUserDto {
    @ApiProperty({
        description: 'User first name',
        example: 'Keks',
      })
    @IsString()
    public firstname: string;

    @ApiProperty({
        description: 'User last name',
        example: 'Ivanov'
      })
    @IsString()
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
    @IsISO8601({}, { message: AUTH_USER_DATE_BIRTH_NOT_VALID })
    public dateBirth: string;

    @ApiProperty({
        description: 'User password',
        example: '123456'
      })
    @IsString()  
    public password: string;
}