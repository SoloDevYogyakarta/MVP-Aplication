import { GetFieldType } from 'src/types/get-field.type';
import { readpath } from '../system/system';

export function getField(filename?: GetFieldType) {
  try {
    const inc = ['token', 'fake'];
    if (inc.includes(filename)) {
      return readpath(`../../database/dataTxt/${filename}.txt`);
    }
    return JSON.parse(readpath(`../../database/dataTxt/${filename}.txt`));
  } catch (err) {
    throw new Error(err);
  }
}
