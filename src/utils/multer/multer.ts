import multer from 'multer';
import { nanoid } from 'nanoid';
import { joinpath } from '../system/system';

export const diskStorage = multer.diskStorage({
  filename(req, file: Express.Multer.File, callback) {
    callback(null, `${nanoid()}.${file.mimetype.split('/')[1]}`);
  },
  destination(req, file, cb) {
    cb(null, joinpath('../../assets'));
  },
});
