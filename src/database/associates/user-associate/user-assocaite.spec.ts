import { getfield } from '../../../utils/get-field/get-field';
import * as user from './user-associate';

describe('UserAssociate', () => {
  let public_id!: string;

  it('should to be defined', () => expect(user).toBeDefined());

  it('render correctly', () => expect(user).toMatchSnapshot());

  try {
    public_id = getfield('user-http-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('findOne with relationship', async () => {
      const findOne = await user.userAssociate.findOne({
        where: { public_id },
        attributes: user.userAttribute,
        include: user.userInclude,
      });
      expect(findOne.public_id).toEqual(public_id);
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
        where: { public_id },
        attributes: user.userAttribute,
        include: user.userHistoryInclude,
      });
      expect(findOne.public_id).toEqual(public_id);
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
