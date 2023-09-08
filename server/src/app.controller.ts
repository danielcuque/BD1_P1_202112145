import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/*

    Los endpoints van a ser:
    ACCION NOMBRE ENDPOINT
Mostrar consulta 1 /consulta1
Mostrar consulta 2 /consulta2
Mostrar consulta 3 /consulta3
Mostrar consulta 4 /consulta4
Mostrar consulta 5 /consulta5
Mostrar consulta 6 /consulta6
Mostrar consulta 7 /consulta7
Mostrar consulta 8 /consulta8
Mostrar consulta 9 /consulta9
Mostrar consulta 10 /consulta10
Mostrar consulta 11 /consulta11
Eliminar datos de la tabla temporal /eliminartabtemp
Carga masiva de datos a tabla temporal /cargartabtemp
Eliminar las tablas de la base de datos
(modelo de datos)
/eliminarmodelo
Crear tablas del modelo /crearmodelo
Cargar datos a modelo /cargarmodelo
*/

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
    getCargarTabTemp(): string {
        return this.appService.getCargarTabTemp();
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