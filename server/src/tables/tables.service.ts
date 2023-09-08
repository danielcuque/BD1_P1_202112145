import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource} from 'typeorm';
import { temporaryTables } from './tables.scripts';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class TablesService {

    constructor(
        private readonly filesService:  FilesService,
        private readonly dataSource: DataSource
    ) {}
    
    async generateTables(){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            for (const table of temporaryTables()) {
                await queryRunner.query(table);
            }

            const cargos = await this.filesService.readFile('cargos.csv');
            for (const cargo of cargos) {
                const values = Object.values(cargo);
                await queryRunner.query(
                    `INSERT INTO tempCARGO(id_cargo, nombre_cargo) VALUES(?, ?);`,
                    [values[0], values[1]]
                );
            }

            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new BadRequestException(error.message);
        }
    
    }

    // async insertData() {  
    // }
}
