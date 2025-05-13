import { ResponseUserDto } from 'src/modules/user/dto/response-user.dto';
import { UserDocument } from 'src/modules/user/user.schema';

export function userResponse(user: UserDocument): ResponseUserDto {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
}
