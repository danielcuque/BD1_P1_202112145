import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

    @Get('/consulta1')
    getConsulta1(): string {
        return this.appService.getConsulta1();
    }

    @Get('/consulta2')
    getConsulta2(): string {
        return this.appService.getConsulta2();
    }

    @Get('/consulta3')
    getConsulta3(): string {
        return this.appService.getConsulta3();
    }

    @Get('/consulta4')
    getConsulta4(): string {
        return this.appService.getConsulta4();
    }

    @Get('/consulta5')
    getConsulta5(): string {
        return this.appService.getConsulta5();
    }

    @Get('/consulta6')
    getConsulta6(): string {
        return this.appService.getConsulta6();
    }

    @Get('/consulta7')
    getConsulta7(): string {
        return this.appService.getConsulta7();
    }

    @Get('/consulta8')
    getConsulta8(): string {
        return this.appService.getConsulta8();
    }

    @Get('/consulta9')
    getConsulta9(): string {
        return this.appService.getConsulta9();
    }

    @Get('/consulta10')
    getConsulta10(): string {
        return this.appService.getConsulta10();
    }

    @Get('/consulta11')
    getConsulta11(): string {
        return this.appService.getConsulta11();
    }

    @Get('/cargartabtemp')
    async getCargarTabTemp() {
        return await this.appService.getCargarTabTemp();
    }

    @Get('/eliminarmodelo')
    getEliminarModelo(): string {
        return this.appService.getEliminarModelo();
    }

    @Get('/crearmodelo')
    getCrearModelo(): string {
        return this.appService.getCrearModelo();
    }
}