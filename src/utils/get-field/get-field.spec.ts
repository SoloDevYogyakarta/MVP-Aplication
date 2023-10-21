import { getField } from './get-field';

describe('get-field', () => {
  it('should to be defined', () => expect(getField).toBeDefined());

  it('render correctly', () => expect(getField).toMatchSnapshot());

  it('should can read filename object.txt', () =>
    expect(getField('object')).toEqual({ message: 'works!' }));

  it('should can read filename fake.txt', () =>
    expect(getField('fake')).toEqual('fake'));

  it('should to be error', () => {
    try {
      getField();
    } catch (err) {
      expect(err.toString()).toContain('ENOENT:');
    }
  });
});
