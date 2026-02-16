// ** NestJs
import { BadRequestException, NotFoundException } from '@nestjs/common';

// ** Mongoose
import mongoose from 'mongoose';

// ** Messages
import { COMMON_MESSAGES } from '../configs/messages/common.message';

export const validateMongoId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundException(COMMON_MESSAGES.INVALID_ID);
  }
};

export const validateMongoIds = (ids: string[]) => {
  if (!ids || ids.length === 0) {
    throw new BadRequestException(COMMON_MESSAGES.INVALID_IDS);
  }

  const invalid = ids.filter((id) => !mongoose.Types.ObjectId.isValid(id));
  if (invalid.length > 0) {
    throw new BadRequestException(COMMON_MESSAGES.INVALID_IDS);
  }
};
