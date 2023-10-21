import fs from 'fs';
import { join } from 'path';

export function joinpath(path: string): string {
  return join(__dirname, path);
}

export function createpath(path: string, data: unknown): void {
  if (typeof data !== 'string') {
    data = JSON.stringify(data);
  }
  fs.writeFileSync(joinpath(path), data as string);
}

export function readpath(path: string): string {
  return fs.readFileSync(joinpath(path), { encoding: 'utf-8' });
}

export function removepath(path: string): void {
  fs.unlinkSync(joinpath(path));
}
