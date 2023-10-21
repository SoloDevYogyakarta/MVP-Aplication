import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DyanmicQuery } from '../../validators/query/product.query';
import { AuthGuard } from '../../middleware/guards.middleware';
import { ProductRepository } from '../../repository/product/product.repository';

@Controller('product')
export class ProductController {
  constructor(private readonly repository: ProductRepository) {}

  @UseGuards(AuthGuard)
  @Delete(':id')
  async destroy(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('destroy');
  }

  @UseGuards(AuthGuard)
  @Get()
  async list(@Query() query: DyanmicQuery, @Res() res: Response) {
    const result = await this.repository.findAll(query);
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async detail(@Req() req: Request, @Res() res: Response) {
    const result = await this.repository.findOne(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }
}
