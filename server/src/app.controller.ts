import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

    @Get('/consulta1')
    async getConsulta1(){
        return this.appService.getConsulta1();
    }

    @Get('/consulta2')
    async getConsulta2(){
        return this.appService.getConsulta2();
    }

    @Get('/consulta3')
    async getConsulta3(){
        return this.appService.getConsulta3();
    }

    @Get('/consulta4')
    async getConsulta4(){
        return this.appService.getConsulta4();
    }

    @Get('/consulta5')
    async getConsulta5(){
        return this.appService.getConsulta5();
    }

    @Get('/consulta6')
    async getConsulta6(){
        return this.appService.getConsulta6();
    }

    @Get('/consulta7')
    async getConsulta7(){
        return this.appService.getConsulta7();
    }

    @Get('/consulta8')
    async getConsulta8(){
        return this.appService.getConsulta8();
    }

    @Get('/consulta9')
    async getConsulta9(){
        return this.appService.getConsulta9();
    }

    @Get('/consulta10')
    async getConsulta10(){
        return this.appService.getConsulta10();
    }

    @Get('/consulta11')
    async getConsulta11(){
        return this.appService.getConsulta11();
    }

    @Get('/cargartabtemp')
    async getCargarTabTemp() {
        return await this.appService.getCargarTabTemp();
    }

    @Get('/eliminarmodelo')
    async getEliminarModelo() {
        return this.appService.getEliminarModelo();
    }

    @Get('/crearmodelo')
    async getCrearModelo() {
        return this.appService.getCrearModelo();
    }
}