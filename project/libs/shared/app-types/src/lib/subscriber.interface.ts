import { UserRole } from "./user-role.enum";

export interface Subscriber {
    id?: string;
    email: string;
    firstname: string;
    lastname: string;
    role: UserRole;
  }