import { sequelize } from './entity';

describe('Entity', () => {
  it('should to be defined', () => expect(sequelize).toBeDefined());

  it('render correctly', () => expect(sequelize).toMatchSnapshot());

  it('connect to database', async () => {
    await sequelize
      .authenticate()
      .then(() => expect(true).toEqual(true))
      .catch((err) => {
        throw new Error(err);
      });
  });
});
