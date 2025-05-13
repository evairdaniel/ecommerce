import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userResponse } from 'src/Common/utils/response-user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto) {
    try {
      const user = new this.userModel(dto);
      await user.save();
      return userResponse(user);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('E-mail já está em uso');
      }
      throw error;
    }
  }

  findAll() {
    return this.userModel.find().then((users) => users.map(userResponse));
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return userResponse(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    user.name = dto.name || user.name;
    user.email = dto.email || user.email;

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }

    await user.save();

    return userResponse(user);
  }

   async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    return userResponse(user);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
