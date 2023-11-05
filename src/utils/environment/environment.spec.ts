import { environment } from './environment';

describe('environment', () => {
  it('should to be defined', () => expect(environment).toBeDefined());

  it('render correctly', () => expect(environment).toMatchSnapshot());

  it('read DB_HOST', () => expect(environment['DB_HOST']).toEqual('127.0.0.1'));
});
