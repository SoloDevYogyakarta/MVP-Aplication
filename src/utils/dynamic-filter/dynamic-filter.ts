import { Op } from 'sequelize';
import { some } from 'lodash';
import { DyanmicQuery } from '../../validators/query/product.query';

export function dynamicFilter(
  where: Object,
  datas: DyanmicQuery[],
  query: Object,
) {
  Object.keys(query).filter((key) => {
    datas = [...datas, { [key]: { [Op.iLike]: query[key] } }];
  });
  if (some(query)) {
    where = { [Op.or]: datas };
  }
}
