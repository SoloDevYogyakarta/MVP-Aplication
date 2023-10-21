import { Request, Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserRepository } from '../../repository/user/user.repository';
import {
  LoginField,
  RegisterField,
  UserUpdatedField,
} from '../../validators/user/user.validator';
import { UserService } from '../../services/user/user.service';
import { AuthGuard } from '../../middleware/guards.middleware';
import { createpath } from '../../utils/system/system';
import { omit } from 'lodash';

@Controller('user')
export class UserController {
  constructor(
    private readonly repository: UserRepository,
    private readonly service: UserService,
  ) {}

  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: LoginField,
  ) {
    const result = await this.service.login(body);
    return res.status(result.status).json(result);
  }

  @Post()
  async created(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: RegisterField,
  ) {
    const result = await this.service.created(body);
    createpath(
      '../../../src/database/dataTxt/user-http-entity.txt',
      result.result,
    );
    return res.status(result.status).json(omit(result, ['result']));
  }

  @Post('reset/password')
  reset(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('reset');
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  async updated(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: UserUpdatedField,
  ) {
    const result = await this.service.updated(req.params.id, body);
    return res.status(result.status).json(result);
  }

  @Delete(':id')
  async destroy(@Req() req: Request, @Res() res: Response) {
    const result = await this.service.destroy(req.params.id);
    return res.status(result.status).json(result);
  }

  @UseGuards(AuthGuard)
  @Get()
  async list(@Req() req: Request, @Res() res: Response) {
    const result = await this.repository.findAll();
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async detail(@Req() req: Request, @Res() res: Response) {
    const result = await this.repository.findOne(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }
}
