import { getfield } from './get-field';

describe('getfield', () => {
  it('should to be defined', () => expect(getfield).toBeDefined());

  it('render correctly', () => expect(getfield).toMatchSnapshot());

  it('read file fake.txt', () => expect(getfield('fake')).toEqual('fake'));

  it('read file object.txt', () =>
    expect(getfield('object')).toEqual({
      message: 'works!',
    }));

  it('error', () => {
    try {
      getfield();
    } catch (err) {
      expect(err.toString()).toContain('ENOENT:');
    }
  });
});
