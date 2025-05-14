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
import bcrypt from 'bcrypt';
import { Profile, ProfileDocument } from '../profile/profile.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>, ) {}

  async create(dto: CreateUserDto) {
  
    const existingUser = await this.userModel.findOne({ email: dto.email });

    if (existingUser) {
      throw new BadRequestException('E-mail já está em uso');
    }

      const user = new this.userModel(dto);

      if(dto.profileId){
        const existProfile = await this.profileModel.findOne({ _id: dto.profileId });
        user.profile = existProfile;
      }

      await user.save();
      return userResponse(user);
    
  }

  async findAll() {
    const users = await this.userModel
      .find()
      .populate('profile');
     return users.map(userResponse);
  }

  async findOne(id: string) {
     const user = await this.userModel
      .findById(id)
      .populate('profile'); 

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

    if (dto.profileId) {
      const existProfile = await this.profileModel.findOne({ _id: dto.profileId });
      console.log('profile', existProfile);
      user.profile =existProfile;
    }
    console.log('antes', user);
    
    await user.save();
    console.log('depois', user);
    return userResponse(user);
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return userResponse(user);
  }

  async findByEmail(email: string) {
    const user = await this.userModel
      .findOne({ email })
      .populate('profile');

      if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
