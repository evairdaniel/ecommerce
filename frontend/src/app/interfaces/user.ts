import type { Profile } from "./profile ";

export interface User {
  id: string;
  name?: string;
  email?: string;
  profile?: Profile | null;
}

export interface UpdateUserDto {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  profileId?: string;
}

export interface UserDto {
  name?: string;
  email?: string;
  password?: string;
  profileId?: string;
}