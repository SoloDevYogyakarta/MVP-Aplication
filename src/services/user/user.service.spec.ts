import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getField } from '../../utils/get-field/get-field';
import env from '../../utils/env/env';
import { UserService } from './user.service';

describe('UserService', () => {
  let username!: string;
  let email!: string;
  let public_id!: string;
  let destory_id!: string;
  let service: UserService;

  beforeEach(() => {
    const jwtService = new JwtService({
      secret: env['SECRET'],
    });
    service = new UserService(jwtService);
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());

  try {
    public_id = getField('user-http-entity').public_id;
    username = getField('user-http-entity').username;
    email = getField('user-http-entity').email;
  } catch (err) {
    // empty
  }
  try {
    destory_id = getField('user-service-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id && username) {
    it('update with image', async () => {
      const result = await service.update(
        public_id,
        {
          username,
          password: 'password',
        },
        {
          fieldname: 'file',
          originalname: '391282393_7054748857952078_2554999196306250130_n.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination:
            '/Users/kenedy-/mvpapplication/mvpapplication/src/assets',
          filename: 'v2EFO-prv1RXb3dU20H8o.jpeg',
          path: '/Users/kenedy-/mvpapplication/mvpapplication/src/assets/v2EFO-prv1RXb3dU20H8o.jpeg',
          size: 409192,
        } as Express.Multer.File,
      );
      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Account has been updated',
      });
    });
    it('invalid udpate', async () => {
      try {
        await service.update(
          'dqwdqwd',
          {
            username,
            password: 'password',
          },
          {} as any,
        );
      } catch (err) {
        expect(err.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
    it('update user without image', async () => {
      const result = await service.update(
        public_id,
        {
          username,
          password: 'password',
        },
        {} as any,
      );
      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Account has been updated',
      });
    });

    it('invalid destroy', async () => {
      try {
        await service.destroy('dqwdqw');
      } catch (err) {
        expect({ status: err.status, message: err.message }).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Account not found',
        });
      }
    });

    it('invalid update role', async () => {
      try {
        await service.changeRole('dqwdq', {
          public_id: 'dqwdq',
          role: 'dqdqw',
        });
      } catch (err) {
        expect({ status: err.status, message: err.message }).toEqual({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'false',
        });
      }
    });

    it('isAdmin', async () => {
      const result = await service.isAdmin('dqwdq');
      expect(result).toEqual(false);
    });
  }
});
