import { ResponseUserDto } from 'src/modules/user/dto/response-user.dto';

export function userResponse(user: any): ResponseUserDto {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    profile: user.profile
      ? {
          profileId: user.profile.id,
          bio: user.profile.bio,
          avatar: user.profile.avatar,
          role: user.profile.role,
        }
      : null,
  };
}
