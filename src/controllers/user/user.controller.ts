import { Request, Response } from 'express';
import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UserRepository } from 'src/repository/user/user.repository';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly repository: UserRepository,
    private readonly service: UserService,
  ) {}

  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('login');
  }

  @Post()
  created(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.CREATED).json('created');
  }

  @Post('reset/password')
  reset(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('reset');
  }

  @Post(':id')
  updated(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('updated');
  }

  @Get()
  list(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      message: 'user::list',
    });
  }

  @Get(':id')
  async detail(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('detail');
  }
}
