import * as system from './system';

describe('System', () => {
  it('should to be defined', () => expect(system).toBeDefined());

  it('render correctly', () => expect(system).toMatchSnapshot());

  it('createpath should to be successfully', () => {
    const create = system.createpath('../folder-text/object.txt', {
      message: 'works!',
    });
    system.createpath('../folder-text/remove.txt', 'remove');
    system.createpath('../folder-text/fake.txt', 'fake');
    expect(create).toEqual(undefined);
  });

  it('joinpath should to be successfully', () =>
    expect(system.joinpath('../folder-text')).toContain('folder-text'));

  it('readpath should to be successfully', () =>
    expect(JSON.parse(system.readpath('../folder-text/object.txt'))).toEqual({
      message: 'works!',
    }));

  it('removepath should to be successfully', () =>
    expect(system.removepath('../folder-text/remove.txt')).toEqual(undefined));
});
