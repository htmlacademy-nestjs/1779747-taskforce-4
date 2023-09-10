import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const enum ErrorMongo {
  BAD_MONGOID_ERROR = 'Bad entity ID',
  BAD_MONGOID_PARAM = 'This pipe must used only with params!'
}


@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(ErrorMongo.BAD_MONGOID_PARAM)
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ErrorMongo.BAD_MONGOID_ERROR);
    }

    return value;
  }
}