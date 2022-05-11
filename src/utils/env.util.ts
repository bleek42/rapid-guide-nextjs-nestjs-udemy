import { resolve } from 'node:path/posix';
import { existsSync } from 'node:fs';

export function envFileUtil(destination: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${destination}/.env`);
  const fileName: string = env ? `${env}.env` : 'development.env';

  let filePath: string = resolve(`${destination}/${fileName}`);

  if (!existsSync(filePath)) filePath = fallback;

  return filePath;
}
