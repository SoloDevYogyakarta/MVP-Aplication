import multer from 'multer';
import { nanoid } from 'nanoid';
import { joinpath } from '../system/system';

export const uploadOptions = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, joinpath('../../assets'));
  },
  filename(req, file: Express.Multer.File, callback) {
    callback(null, `${nanoid()}.${file.mimetype.split('/')[1]}`);
  },
});
