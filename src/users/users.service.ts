// ** NestJs
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// ** DTO
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

// ** Schemas
import { User, UserDocument } from './schemas/user.schema';

// ** Soft Delete Plugin
import type { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

// ** Bcryptjs
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

// ** Interface
import { IUser } from './users.interface';

// ** Message
import { USERS_MESSAGES } from '../configs/messages/user.message';

// ** utils
import { validateMongoId } from '../utils/mongoose.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
  ) {
  }

  async ensureNotDeleted(_id: string) {
    validateMongoId(_id);
    const user = await this.userModel.findById(_id).select('isDeleted').lean();
    if (!user) {
      throw new BadRequestException(USERS_MESSAGES.DELETED_OR_BANNED);
    }
  }

  // Auth
  findOneByEmail(email: string) {
    return this.userModel.findOne({
      email,
    });
  }

  findUserByToken(refreshToken: string) {
    return this.userModel.findOne({ refreshToken });
  }

  async register(user: RegisterDto) {
    const { email, password } = user;

    // check email exists
    if (await this.userModel.findOne({ email })) {
      throw new BadRequestException(USERS_MESSAGES.EMAIL_EXISTED);
    }

    const hash = this.getHashPassword(password);
    return this.userModel.create({ ...user, password: hash });
  }

  // Profile
  async findProfile(user: IUser) {
    await this.ensureNotDeleted(user._id);
    return this.userModel
      .findById(user._id)
      .select('-password -refreshToken -isDeleted -deletedAt');
  }

  async updateProfile(updateProfileDto: UpdateProfileDto, user: IUser) {
    await this.ensureNotDeleted(user._id);

    return this.userModel.findByIdAndUpdate(
      user._id,
      { $set: updateProfileDto },
      { new: true }
    );
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  updateUserToken(refreshToken: string, _id: string) {
    return this.userModel.updateOne({ _id }, { $set: { refreshToken } });
  }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  };

  // End Auth

  async findOne(id: string) {
    await this.ensureNotDeleted(id);

    return this.userModel
      .findOne({
        _id: id,
      })
      .select('-password -refreshToken -isDeleted');
  }
}
