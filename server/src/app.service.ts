import { Inject, Injectable } from '@nestjs/common';
import { FilesService } from './files/files.service';

@Injectable()
export class AppService {

    constructor(
        @Inject(FilesService) private readonly filesService: FilesService,
    ) { }

    getConsulta1(): string {
        return 'Hello World!';
    }
    getConsulta2(): string {
        return 'Hello World!';
    }
    getConsulta3(): string {
        return 'Hello World!';
    }
    getConsulta4(): string {
        return 'Hello World!';
    }
    getConsulta5(): string {
        return 'Hello World!';
    }
    getConsulta6(): string {
        return 'Hello World!';
    }
    getConsulta7(): string {
        return 'Hello World!';
    }
    getConsulta8(): string {
        return 'Hello World!';
    }
    getConsulta9(): string {
        return 'Hello World!';
    }
    getConsulta10(): string {
        return 'Hello World!';
    }
    getConsulta11(): string {
        return 'Hello World!';
    }

    async getCargarTabTemp() {
        const cargos = await this.filesService.readFile('cargos.csv');
        return true
    }
    getEliminarModelo(): string {
        return 'Hello World!';
    }
    getCrearModelo(): string {
        return 'Hello World!';
    }
}