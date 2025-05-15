import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile, ProfileDocument } from './profile.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { profileResponse } from 'src/Common/utils/response-profile';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async create(dto: CreateProfileDto) {
    const profile = new this.profileModel(dto);
    await profile.save();
    return profileResponse(profile);
  }

  async findOne(id: string) {
    const profile = await this.profileModel.findById(id);

    if (!profile) {
      throw new NotFoundException('Perfil não encontrado');
    }

    return profileResponse(profile);
  }

  async update(id: string, dto: UpdateProfileDto) {
    const profile = await this.profileModel.findById(id);

    if (!profile) {
      throw new NotFoundException('Perfil não encontrado');
    }

    profile.bio = dto.bio || profile.bio;
    profile.avatar = dto.avatar || profile.avatar;
    profile.role = dto.role !== undefined ? dto.role : profile.role;

    await profile.save();
    return profileResponse(profile);
  }

  async remove(id: string) {
    const profile = await this.profileModel.findByIdAndDelete(id);
    if (!profile) {
      throw new NotFoundException('Perfil não encontrado');
    }
    return profileResponse(profile);
  }
}
