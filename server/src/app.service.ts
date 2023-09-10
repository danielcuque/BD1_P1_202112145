import { Inject, Injectable } from '@nestjs/common';
import { TablesService } from './tables/tables.service';

@Injectable()
export class AppService {

    constructor(
        @Inject(TablesService) private readonly tablesService: TablesService,
    ) { }

    async getConsulta1(){
        return await this.tablesService.executeScript(1)
    }
    async getConsulta2(){
        return await this.tablesService.executeScript(2)
    }
    async getConsulta3(){
        return await this.tablesService.executeScript(3)
    }
    async getConsulta4(){
        return await this.tablesService.executeScript(4)
    }
    async getConsulta5(){
        return await this.tablesService.executeScript(5)
    }
    async getConsulta6(){
        return await this.tablesService.executeScript(6)
    }
    async getConsulta7(){
        return await this.tablesService.executeScript(7)
    }
    async getConsulta8(){
        return await this.tablesService.executeScript(8)
    }
    async getConsulta9(){
        return await this.tablesService.executeScript(9)
    }
    async getConsulta10(){
        return await this.tablesService.executeScript(10)
    }
    async getConsulta11(){
        return await this.tablesService.executeScript(11)
    }

    async getCargarTabTemp() {
        await this.tablesService.generateTables();
        return 'Datos insertados correctamente';
    }

    async getEliminarModelo() {
        await this.tablesService.deleteModel();
        return 'Modelo eliminado correctamente'
    }

    async getCrearModelo() {
        await this.tablesService.createRealTables();
        return 'Modelo creado correctamente';
    }
}