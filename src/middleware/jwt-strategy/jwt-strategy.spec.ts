import { JwtStrategy } from './jwt-strategy';

describe('JwtStrategy', () => {
  it('should to be defined', () => expect(JwtStrategy).toBeDefined());

  it('render correctly', () => expect(JwtStrategy).toMatchSnapshot());
});
