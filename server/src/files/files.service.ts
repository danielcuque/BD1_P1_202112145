import { Injectable, BadRequestException } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as csvParser from 'csv-parser';


@Injectable()
export class FilesService {
  async readFile(path: string): Promise<any> {
    const results = []

    const fullPath = join(__dirname, '..', '..','..', 'dataset', path);

    return new Promise((resolve, reject) => {
      createReadStream(fullPath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => 
          reject(new BadRequestException(error.message)));
    });
  }
}
