import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  FreeTextEntity,
  freeTextEntity,
} from '../../database/entities/public/free-text-entity/free-text-entity';
import { sparepartEntity } from '../../database/entities/services/sparepart-entity/sparepart-entity';
import { SparepartField } from '../../dto/sparepart-dto/sparepart-dto';

@Injectable()
export class SparepartService {
  private readonly logger = new Logger(SparepartService.name);

  async create(body: SparepartField[]) {
    this.logger.log(SparepartService.name);
    let free!: FreeTextEntity;
    const create = await sparepartEntity.create();
    create.save();
    for (const values of body) {
      const freeText = await freeTextEntity.create({
        ...values,
        sparepart_id: create.id,
      });
      freeText.save();
      free = freeText;
    }
    return {
      status: HttpStatus.CREATED,
      message: 'Sparepart has been create',
      create,
      free,
    };
  }

  async update(id: number, body: SparepartField[]) {
    this.logger.log(SparepartService.name);
    const findOne = await sparepartEntity.findOne({ where: { id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Sparepart not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    for (const values of body) {
      const free = await freeTextEntity.findOne({ where: { id: values.id } });
      if (!free) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Free text not found',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      free.text = values.text;
      free.save();
    }
    return { status: HttpStatus.OK, message: 'Sparepart has been update' };
  }

  async destroy(id: number) {
    this.logger.log(SparepartService.name);
    const findOne = await sparepartEntity.findOne({ where: { id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Sparepart not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'Sparepart has been delete' };
  }

  async freeDestroy(id: number) {
    const findOne = await freeTextEntity.findOne({ where: { id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Free text not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'Free text has been delete' };
  }
}
