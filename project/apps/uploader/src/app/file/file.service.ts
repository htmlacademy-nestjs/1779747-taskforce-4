import { uploaderConfig } from '@project/config/config-uploader';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { extension } from 'mime-types';
import * as crypto from 'node:crypto';
import dayjs from 'dayjs';

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
  ) {}
  public async writeFile(file: Express.Multer.File): Promise<string> {
    const [ year, month ] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.applicationConfig;

    const filename = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);

    const uploadDirectoryPath = `${uploadDirectory}/${year}/${month}`;
    const destinationFile = `${uploadDirectoryPath}/${filename}.${fileExtension}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return destinationFile;
  }
}
