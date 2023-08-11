import { City } from "@project/shared/app-types";

export class CreateUserDto {
    public firstname: string;
    public lastname: string;
    public email: string;
    public city: City;
    public dateBirth: string;
    public password: string;
}