import env from './env';

describe('env', () => {
  it('should to be defined', () => expect(env).toBeDefined());

  it('render correctly', () => expect(env).toMatchSnapshot());
});
