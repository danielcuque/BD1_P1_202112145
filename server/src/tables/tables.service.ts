import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource} from 'typeorm';
import { insertDataToRealTables, temporaryTables } from './tables.scripts';
import { FilesService } from 'src/files/files.service';

const data = {
    "candidatos.csv": "INSERT INTO tempCANDIDATO(id_candidato, nombre_candidato, fecha_nacimiento, id_partido, id_cargo) VALUES ?",
    "cargos.csv": "INSERT INTO tempCARGO(id_cargo, nombre_cargo) VALUES ?",
    "ciudadanos.csv": "INSERT INTO tempCIUDADANO(dpi, nombre, apellido, direccion, telefono, edad, genero) VALUES ?",
    "departamentos.csv": "INSERT INTO tempDEPARTAMENTO(id_departamento, nombre_departamento) VALUES ?",
    "mesas.csv": "INSERT INTO tempMESA(id_mesa, id_departamento) VALUES ?",
    "partidos.csv": "INSERT INTO tempPARTIDO(id_partido, nombre_partido, siglas, fecha_fundacion) VALUES ?",
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

        temporaryTables().forEach((table) => {
            statements.push({sql: table, params: []});
        });

        
        for (const file of Object.keys(data)) {
            const fileData = await this.filesService.parseCsvFile(file);

            if (file === "votaciones.csv") {
                const [votos, detallesVoto] = fileData;
            
                statements.push({
                  sql: 'INSERT INTO tempVOTO(id_voto, dpi, id_mesa, fecha_voto) VALUES ?',
                  params: [Array.from(votos.values())],
                });
            
                statements.push({
                  sql: 'INSERT INTO tempDETALLE_VOTO(id_voto, id_candidato) VALUES ?',
                  params: [detallesVoto],
                });
                continue;
            } 
            
            statements.push({
                sql: data[file],
                params: [fileData],
            });
            

        }

        insertDataToRealTables().forEach((query) => {
            statements.push({sql: query, params: []});
        });

        await this.executeQuery(statements);
    }

    async createRealTables(){
        const rawTables =  await this.filesService.readFile('../../../store/script.sql');

        const statements = rawTables.split(';').slice(0, -1).map((statement) => {
            return {sql: statement, params: []};
        });

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
                const res = await queryRunner.query(statement.sql, statement.params);
                console.log(statement.sql, res);
            }

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new BadRequestException(error.message);
        }
    }
}
