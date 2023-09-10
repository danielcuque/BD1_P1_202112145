import { Injectable } from '@nestjs/common';
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
      trim: true,
      bom: true,
    });

    const stream = createReadStream(fullPath)
    const parser = stream.pipe(csvParser);

    if (path === 'votaciones.csv') {
      results.push(
        new Map(), [])
    }

    for await (const record of parser) {
      Object.keys(record).forEach((key) => {
        const value = record[key];
        if (value.split('/').length === 3) {
          const parts = value.split(' ');
          if (parts.length === 1){
            const [day, month, year] = parts[0].split('/');
            record[key] = `${year}-${month}-${day}`;
            return
          } 

          const [day, month, year] = parts[0].split('/');
          const [hour, minute] = parts[1].split(':');
          record[key] = `${year}-${month}-${day} ${hour}:${minute}`; 
        }
      })

      if ('' in record) delete record['']

      if (path === 'votaciones.csv') {
        const [voto, detalle_voto] = results;
        const { id_voto, id_candidato, dpi_ciudadano, mesa_id, fecha_hora } = record;

        if (!voto.has(dpi_ciudadano)) {
          voto.set(dpi_ciudadano, [id_voto, dpi_ciudadano, mesa_id, fecha_hora]);
        }

        detalle_voto.push([id_voto, id_candidato]);
        
        continue;
      }

      results.push(Object.values(record))
    }

    return results;
  }
}
