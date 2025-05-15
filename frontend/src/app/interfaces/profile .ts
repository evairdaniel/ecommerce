export interface Profile {
  id: string;
  bio: string;
  avatar: string;
  role: number;
}

export interface UpdateProfileDto {
  id: string;
  bio?: string;
  avatar?: string;
  role?: number;
}

export interface ProfileDto {
  bio?: string;
  avatar?: string;
  role?: number;
}