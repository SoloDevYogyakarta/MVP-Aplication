import { Request, Response } from 'express';
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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserRepository } from '../../repository/user/user.repository';
import {
  LoginField,
  RegisterField,
} from '../../validators/user/user.validator';
import { UserService } from '../../services/user/user.service';
import { AuthGuard } from '../../middleware/guards.middleware';
import { createpath } from '../../utils/system/system';
import { omit } from 'lodash';
import { DyanmicQuery } from '../../validators/query/product.query';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from '../../utils/multer/multer';
import { CustomRequest } from '../../types/custom-request.type';

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
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: RegisterField,
  ) {
    const result = await this.service.create(body);
    createpath('../../database/dataTxt/user-http-entity.txt', result.result);
    return res.status(result.status).json(omit(result, ['result']));
  }

  @Post('reset/password')
  reset(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('reset');
  }

  @UseInterceptors(FileInterceptor('file', { storage: diskStorage }))
  @UseGuards(AuthGuard)
  @Post(':id')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.service.update(req.params.id, req.body, file);
    return res.status(result.status).json(result);
  }

  @Delete(':id')
  async destroy(@Req() req: Request, @Res() res: Response) {
    const result = await this.service.destroy(req.params.id);
    return res.status(result.status).json(result);
  }

  @UseGuards(AuthGuard)
  @Get()
  async list(
    @Query() query: DyanmicQuery,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.repository.findAll(query);
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async detail(@Req() req: Request, @Res() res: Response) {
    const result = await this.repository.findOne(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard)
  @Get('access/me')
  async me(@Req() req: CustomRequest, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(req.user.data);
  }
}
