import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CustomRequest } from '../../types/custom-request.type';
import { ProductPromoRepository } from '../../repository/promo/promo.repository';
import { DyanmicQuery } from '../../validators/query/product.query';
import { PromoField } from '../../validators/promo/promo.validator';
import { ProductPromoService } from '../../services/promo/promo.service';
import { AuthGuard } from '../../middleware/guards.middleware';

@Controller('promo')
export class PromoController {
  constructor(
    private readonly repository: ProductPromoRepository,
    private readonly service: ProductPromoService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async created(
    @Req() req: CustomRequest,
    @Res() res: Response,
    @Body() body: PromoField,
  ) {
    const result = await this.service.create(body, req.user.data.public_id);
    return res.status(result.status).json(result);
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  async updated(
    @Req() req: CustomRequest,
    @Res() res: Response,
    @Body() body: PromoField,
  ) {
    const result = await this.service.update(
      body,
      req.params.id,
      req.user.data.public_id,
    );
    return res.status(result.status).json(result);
  }

  @Get()
  async list(
    @Query() query: DyanmicQuery,
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    const result = await this.repository.findAll(query);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  async detail(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.repository.findOne(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async destroy(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.service.destroy(
      req.params.id,
      req.user.data.public_id,
    );
    return res.status(result.status).json(result);
  }
}
