import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
  it('should to be defined', () => expect(AuthGuard).toBeDefined());

  it('render correctly', () => expect(AuthGuard).toMatchSnapshot());
});
