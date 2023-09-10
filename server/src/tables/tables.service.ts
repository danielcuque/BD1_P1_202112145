import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource} from 'typeorm';
import { temporaryTables } from './tables.scripts';
import { FilesService } from 'src/files/files.service';

const data = {
    "candidatos.csv": "INSERT INTO tempCANDIDATO(id_candidato, nombre_candidato, fecha_nacimiento, id_partido, id_cargo) VALUES",
    "cargos.csv": "INSERT INTO tempCARGO VALUES",
    "ciudadanos.csv": "INSERT INTO tempCIUDADANO VALUES",
    "departamentos.csv": "INSERT INTO tempDEPARTAMENTO VALUES",
    "mesas.csv": "INSERT INTO tempMESA VALUES",
    "partidos.csv": "INSERT INTO tempPARTIDO VALUES",
    "votaciones.csv": "",
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

            if (file === "votaciones.csv"){
                const [votos, detallesVoto] = fileData;

                statements.push({sql: `INSERT INTO tempVOTO(id_voto, dpi, id_mesa, fecha_voto) 
                VALUES ${Array.from(votos.values()).map((voto) => `(${Object.values(voto).map((value) => `"${value}"`).join(',')})`).join(',')};`, params: []});

                statements.push({sql: `INSERT INTO tempDETALLE_VOTO(id_voto, id_candidato)
                VALUES ${detallesVoto.map((detalle) => `(${Object.values(detalle).map((value) => `"${value}"`).join(',')})`).join(',')};`, params: []});
                continue;
            }
            const query = `${data[file]}
            ${fileData.map((row) => `(${Object.values(row).map((value) => `"${value}"`).join(',')})`)};
            `

            statements.push({sql: 
                query
                , params: []});
        }

        // Insert data into real tables
        statements.push({sql: 'INSERT INTO DEPARTAMENTO SELECT * FROM tempDEPARTAMENTO;', params: []});
        statements.push({sql: 'INSERT INTO CARGO SELECT * FROM tempCARGO;', params: []});
        statements.push({sql: 'INSERT INTO PARTIDO SELECT * FROM tempPARTIDO;', params: []});
        statements.push({sql: 'INSERT INTO CIUDADANO SELECT * FROM tempCIUDADANO;', params: []});
        statements.push({sql: 'INSERT INTO MESA SELECT * FROM tempMESA;', params: []});
        statements.push({sql: 'INSERT INTO CANDIDATO SELECT * FROM tempCANDIDATO;', params: []});
        statements.push({sql: 'INSERT INTO VOTO SELECT * FROM tempVOTO;', params: []});
        statements.push({sql: 'INSERT INTO DETALLE_VOTO(id_voto, id_candidato) SELECT id_voto, id_candidato FROM tempDETALLE_VOTO;', params: []});

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
                const response = await queryRunner.query(statement.sql, statement.params);
            }

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new BadRequestException(error.message);
        }
    }
}
