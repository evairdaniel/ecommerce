import { ResponseProfileDto } from 'src/modules/profile/dto/response-profile.dto';
import { ProfileDocument } from 'src/modules/profile/profile.schema';

export function profileResponse(profile: ProfileDocument): ResponseProfileDto {
  return {
    id: profile._id.toString(),
    bio: profile.bio,
    avatar: profile.avatar,
    role: profile.role,
  };
}
