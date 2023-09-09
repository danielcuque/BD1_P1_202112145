import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource} from 'typeorm';
import { temporaryTables } from './tables.scripts';
import { FilesService } from 'src/files/files.service';

const data = {
    "candidatos1.csv": "INSERT INTO tempCANDIDATO VALUES(?, ?, ?, ?, ?);",
    // "cargos.csv": "INSERT INTO tempCARGO VALUES(?, ?);",
    // "ciudadanos.csv": "INSERT INTO tempCIUDADANO VALUES(?, ?, ?, ?, ?, ?, ?);",
    // "departamentos.csv": "INSERT INTO tempDEPARTAMENTO VALUES(?, ?);",
    // "mesas.csv": "INSERT INTO tempMESA VALUES(?, ?);",
    // "partidos.csv": "INSERT INTO tempPARTIDO VALUES(?, ?, ?, ?);",
    // "votaciones.csv": "INSERT INTO tempVOTO VALUES(?, ?, ?, ?, ?);",
}

@Injectable()
export class TablesService {

    constructor(
        private readonly filesService:  FilesService,
        private readonly dataSource: DataSource
    ) {}
    
    async generateTables(){
        const statements = []
        for (const table of temporaryTables()) {
            statements.push({sql: table, params: []});
        }

        for (const file of Object.keys(data)) {
            const fileData = await this.filesService.readFile(file);
            // for (const row of fileData) {

                // const params =  Object.values(row);
            
                // statements.push({sql: data[file], params: params});
            // }
        }
        await this.executeQuery(statements);
    }

    async executeQuery(statements: {
        sql: string,
        params: any[]
    }[]){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            for (const statement of statements) {
                await queryRunner.query(statement.sql, statement.params);
            }

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new BadRequestException(error.message);
        }
    }
}
