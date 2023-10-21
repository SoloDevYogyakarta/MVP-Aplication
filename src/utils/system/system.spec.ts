import { createpath, joinpath, readpath, removepath } from './system';

describe('system', () => {
  it('createpath', () => {
    const create = createpath('../../database/dataTxt/object.txt', {
      message: 'works!',
    });
    createpath('../../database/dataTxt/fake.txt', 'fake');
    createpath('../../database/dataTxt/remove.txt', 'remove');
    expect(create).toEqual(undefined);
  });

  it('joinpath should to be successfully', () =>
    expect(joinpath('../../database/dataTxt')).toContain('dataTxt'));

  it('readpath should to be successfully', () =>
    expect(JSON.parse(readpath('../../database/dataTxt/object.txt'))).toEqual({
      message: 'works!',
    }));

  it('removepath should to be successfully', () =>
    expect(removepath('../../database/dataTxt/remove.txt')).toEqual(undefined));
});
