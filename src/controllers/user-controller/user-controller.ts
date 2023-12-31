import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { omit } from 'lodash';
import { Response } from 'express';
import {
  ChangePasswordField,
  LoginField,
  RegisterField,
} from '../../dto/user-dto/user-dto';
import { UserRepository } from '../../repository/user-repository/user-repository';
import { UserService } from '../../services/user-service/user-service';
import { AuthGuard } from '../../middleware/auth-guard/auth-guard';
import { CustomRequest } from '../../types/custom-request.type';
import { HistoryRepository } from '../../repository/history-repository/history-repository';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly repository: HistoryRepository,
    private readonly service: UserService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginField, @Res() res: Response) {
    this.logger.log(UserController.name);
    const result = await this.service.login(body);
    return res.status(result.status).json(result);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: RegisterField, @Res() res: Response) {
    this.logger.log(UserController.name);
    const result = await this.service.create(body);
    return res.status(result.status).json(omit(result, ['result']));
  }

  @UseGuards(AuthGuard)
  @Post('update/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: CustomRequest,
    @Body() body: RegisterField,
    @Res() res: Response,
  ) {
    const result = await this.service.update(req.params.id, body);
    return res.status(result.status).json(result);
  }

  @UseGuards(AuthGuard)
  @Post('update/password/:id')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Req() req: CustomRequest,
    @Body() body: ChangePasswordField,
    @Res() res: Response,
  ) {
    const result = await this.service.changePassword(req.params.id, body);
    return res.status(result.status).json(result);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async all(@Req() req: CustomRequest, @Res() res: Response) {
    this.logger.log(UserController.name);
    const result = await this.userRepository.findAll(
      req.query,
      (req.query as { type: string })?.type,
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard)
  @Get(':id/services')
  @HttpCode(HttpStatus.OK)
  async detail(@Req() req: CustomRequest, @Res() res: Response) {
    this.logger.log(UserController.name);
    const result = await this.repository.findOne(req.params.id);
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard)
  @Get('current/user')
  @HttpCode(HttpStatus.OK)
  async me(@Req() req: CustomRequest, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroy(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.service.destroy(req.params.id);
    return res.status(result.status).json(result);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.service.logout(req.user.data.id);
    return res.status(HttpStatus.OK).json(omit(result, ['findOne']));
  }
}
