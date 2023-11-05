import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Logger,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomRequest } from '../../types/custom-request.type';
import { AuthGuard } from '../../middleware/auth-guard/auth-guard';
import { OrderService } from '../../services/order-service/order-service';

@Controller('order')
export class ServicesOrderController {
  private readonly logger = new Logger(ServicesOrderController.name);

  constructor(private readonly service: OrderService) {}

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroy(@Req() req: CustomRequest, @Res() res: Response) {
    this.logger.log(ServicesOrderController.name);
    const result = await this.service.destroy(req.params.id);
    return res.status(result.status).json(result);
  }
}
