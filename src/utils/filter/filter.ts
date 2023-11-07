import { Op } from 'sequelize';
import { omit } from 'lodash';

export function filter(query: object, type: string) {
  let result = {},
    opType: any;
  switch (type) {
    case 'string':
      opType = Op.substring;
      break;
    case 'number':
      opType = Op.eq;
      break;
    case '<':
      opType = Op.lt;
      break;
    case '<=':
      opType = Op.lte;
      break;
    case '>':
      opType = Op.gt;
      break;
    case '>=':
      opType = Op.gte;
      break;
    case 'between':
      opType = Op.between;
      break;
  }
  Object.keys(omit(query, ['type'])).filter((keyName) => {
    result = {
      [keyName]: {
        [opType]:
          type === 'number'
            ? Number(query[keyName])
            : type === 'between'
            ? JSON.parse(query[keyName])
            : query[keyName],
      },
    };
  });
  return result;
}
