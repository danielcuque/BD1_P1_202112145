import { Injectable, BadRequestException } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { parse as CsvParse } from 'csv-parse';


@Injectable()
export class FilesService {
  async readFile(path: string): Promise<any> {
    const results = []

    const fullPath = join(__dirname, '..', '..','..', 'dataset', path);

    const csvParser = CsvParse({
      delimiter: ',',
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const stream = createReadStream(fullPath)
    const parser = stream.pipe(csvParser);

    for await (const record of parser) {
      // for (const key in record) {
      //   const value = record[key];
      //   if (value.split('/').length === 3) {
      //     const parts = value.split(' ');
      //     if (parts.length === 1){
      //       const [day, month, year] = parts[0].split('/');
      //       record[key] = new Date(
      //         Date.UTC(
      //           parseInt(year),
      //           parseInt(month) - 1,
      //           parseInt(day)
      //         )
      //       );

      //     } else {
      //       const [day, month, year] = parts[0].split('/');
      //       const [hour, minute] = parts[1].split(':');
      //       record[key] = new Date(
      //         Date.UTC(
      //           parseInt(year),
      //           parseInt(month) - 1,
      //           parseInt(day),
      //           parseInt(hour),
      //           parseInt(minute)
      //         )
      //       );
      //     }
      //   }
      // }

      results.push(record)
    }

    return results;

    // return new Promise((resolve, reject) => {
    //   createReadStream(fullPath)
    //     .pipe(csvParser())
    //     .on('data', (data) => 
    //     {
    //       for (const key in data) {
    //         const value = data[key];
    //         if (value.split('/').length === 3) {
    //           const parts = value.split(' ');
    //           if (parts.length === 1){
    //             const [day, month, year] = parts[0].split('/');
    //             data[key] = new Date(
    //               Date.UTC(
    //                 parseInt(year),
    //                 parseInt(month) - 1,
    //                 parseInt(day)
    //               )
    //             );

    //           } else {
    //             const [day, month, year] = parts[0].split('/');
    //             const [hour, minute] = parts[1].split(':');
    //             data[key] = new Date(
    //               Date.UTC(
    //                 parseInt(year),
    //                 parseInt(month) - 1,
    //                 parseInt(day),
    //                 parseInt(hour),
    //                 parseInt(minute)
    //               )
    //             );
    //           }
    //         }
    //       }

    //       results.push(data)

    //     })
    //     .on('end', () => resolve(results))
    //     .on('error', (error) => 
    //       reject(new BadRequestException(error.message)));
    // });
  }
}
