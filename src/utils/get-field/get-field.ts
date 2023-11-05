import { GetFieldType } from 'src/types/get-field.type';
import { readpath } from '../system/system';

export function getfield(filename?: GetFieldType) {
  try {
    const inc = ['fake', 'token', 'token_member'];
    if (inc.includes(filename)) {
      return readpath(`../folder-text/${filename}.txt`);
    }
    return JSON.parse(readpath(`../folder-text/${filename}.txt`));
  } catch (err) {
    throw new Error(err);
  }
}
