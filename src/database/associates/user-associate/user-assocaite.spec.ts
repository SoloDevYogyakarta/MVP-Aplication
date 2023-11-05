import { getfield } from '../../../utils/get-field/get-field';
import * as user from './user-associate';

describe('UserAssociate', () => {
  let id!: number;

  it('should to be defined', () => expect(user).toBeDefined());

  it('render correctly', () => expect(user).toMatchSnapshot());

  try {
    id = getfield('user-http-entity').id;
  } catch (err) {
    // empty
  }

  if (id) {
    it('findOne with relationship', async () => {
      const findOne = await user.userAssociate.findOne({
        where: { id },
        attributes: user.userAttribute,
        include: user.userInclude,
      });
      expect(findOne.id).toEqual(id);
    });

    it('findAll with relationship', async () => {
      const findAll = await user.userAssociate.findAll({
        attributes: user.userAttribute,
        include: user.userInclude,
      });
      expect(findAll.length).not.toEqual(0);
    });

    it('findOne with relationship history', async () => {
      const findOne = await user.userAssociate.findOne({
        where: { id },
        attributes: user.userAttribute,
        include: user.userHistoryInclude,
      });
      expect(findOne.id).toEqual(id);
    });

    it('findAll with relationship history', async () => {
      const findAll = await user.userAssociate.findAll({
        attributes: user.userAttribute,
        include: user.userHistoryInclude,
      });
      expect(findAll.length).not.toEqual(0);
    });
  }
});
