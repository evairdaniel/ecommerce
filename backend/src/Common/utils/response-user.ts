import { ResponseUserDto } from 'src/modules/user/dto/response-user.dto';
import { UserDocument } from 'src/modules/user/user.schema';

export function userResponse(user: any): ResponseUserDto {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    profile: user.profile ? {
      bio: user.profile.bio,
      avatar: user.profile.avatar,
      role: user.profile.role,
    } : null,
  };
}
