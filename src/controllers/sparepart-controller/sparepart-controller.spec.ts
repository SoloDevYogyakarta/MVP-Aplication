import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { SparepartField } from '../../dto/sparepart-dto/sparepart-dto';
import { getfield } from '../../utils/get-field/get-field';
import supertest from 'supertest';
import { SparepartRepository } from '../../repository/sparepart-repository/sparepart-repository';
import { SparepartService } from '../../services/sparepart-service/sparepart-service';
import { environment } from '../../utils/environment/environment';
import { SparepartController } from './sparepart-controller';
import { FreeTextEntity } from '../../database/entities/public/free-text-entity/free-text-entity';

describe('SparepartController', () => {
  let token!: string;
  let id!: number;
  let destroy_id!: number;
  let destroy_free_id!: number;
  let free!: FreeTextEntity;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: environment['SECRET'],
          signOptions: {
            expiresIn: '7d',
          },
        }),
      ],
      controllers: [SparepartController],
      providers: [SparepartService, SparepartRepository],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should to be defined', () => expect(app).toBeDefined());

  it('render correctly', () => expect(app.getHttpServer()).toMatchSnapshot());

  try {
    token = getfield('token');
  } catch (err) {
    // empty
  }
  try {
    id = getfield('sparepart-http-entity').id;
  } catch (err) {
    // empty
  }
  try {
    free = getfield('free-text-http-entity') as FreeTextEntity;
  } catch (err) {
    // empty
  }
  try {
    destroy_id = getfield('sparepart-entity').id;
  } catch (err) {
    // empty
  }
  try {
    destroy_free_id = getfield('free-text-entity').id;
  } catch (err) {
    // empty
  }

  if (token) {
    it('http::sparepart create', async () => {
      await supertest(app.getHttpServer())
        .post('/sparepart')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send([
          {
            text: faker.lorem.paragraph(),
          },
        ] as Partial<SparepartField[]>)
        .expect(HttpStatus.CREATED)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.CREATED,
            message: 'Sparepart has been create',
          }),
        );
    });
  }

  if (id) {
    it('http::sparepart list', async () => {
      await supertest(app.getHttpServer())
        .get('/sparepart')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.length).not.toEqual(0));
    });

    it('http::sparepart detail', async () => {
      await supertest(app.getHttpServer())
        .get(`/sparepart/${id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.id).toEqual(id));
    });
  }

  if (free) {
    it('http::sparepart invalid update', async () => {
      await supertest(app.getHttpServer())
        .post(`/sparepart/0`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send([
          { text: `udpate ${faker.lorem.paragraph()}`, id: free.id },
        ] as Partial<SparepartField[]>)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Sparepart not found',
          }),
        );
    });

    it('http::sparepart update', async () => {
      await supertest(app.getHttpServer())
        .post(`/sparepart/${free.sparepart_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send([
          { text: `udpate ${faker.lorem.paragraph()}`, id: free.id },
        ] as Partial<SparepartField[]>)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Sparepart has been update',
          }),
        );
    });

    it('http::sparepart free-text invalid update', async () => {
      await supertest(app.getHttpServer())
        .post(`/sparepart/${free.sparepart_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send([{ text: `udpate ${faker.lorem.paragraph()}`, id: 0 }] as Partial<
          SparepartField[]
        >)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Free text not found',
          }),
        );
    });
  }

  if (destroy_id) {
    it('http::sparepart destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/sparepart/${destroy_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Sparepart has been delete',
          }),
        );
    });

    it('http::sparepart invalid destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/sparepart/0`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Sparepart not found',
          }),
        );
    });

    it('http::sparepart free-text destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/sparepart/free-text/${destroy_free_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Free text has been delete',
          }),
        );
    });

    it('http::sparepart invalid free-text destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/sparepart/free-text/0`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Free text not found',
          }),
        );
    });
  }
});
