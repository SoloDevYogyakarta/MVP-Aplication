import { GetFieldType } from 'src/types/get-field.type';
import { readpath } from '../system/system';

export function getField(filename?: GetFieldType) {
  try {
    if (filename === 'fake') {
      return readpath(`../../database/dataTxt/${filename}.txt`);
    }
    return JSON.parse(readpath(`../../database/dataTxt/${filename}.txt`));
  } catch (err) {
    throw new Error(err);
  }
}
