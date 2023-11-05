import fs from 'fs';
import { join } from 'path';

function joinpath(path: string): string {
  return join(__dirname, path);
}

function readpath(path: string): string {
  return fs.readFileSync(joinpath(path), { encoding: 'utf-8' });
}

function createpath(path: string, data: unknown): void {
  let values = data;
  if (typeof values !== 'string') {
    values = JSON.stringify(values);
  }
  fs.writeFileSync(joinpath(path), values as string);
}

function removepath(path: string): void {
  fs.unlinkSync(joinpath(path));
}

export { joinpath, readpath, createpath, removepath };
