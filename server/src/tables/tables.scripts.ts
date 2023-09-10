export const temporaryTables = (): string[] => {
    return [
        `CREATE TEMPORARY TABLE IF NOT EXISTS tempPARTIDO(
            id_partido INT NOT NULL,
            nombre_partido VARCHAR(50) NOT NULL,
            siglas VARCHAR(10) NOT NULL,
            fecha_fundacion DATE NOT NULL
        );`,
        
        `CREATE TEMPORARY TABLE IF NOT EXISTS tempCANDIDATO(
            id_candidato INT NOT NULL,
            nombre_candidato VARCHAR(50) NOT NULL,
            fecha_nacimiento DATE NOT NULL,
            id_partido INT NOT NULL,
            id_cargo INT NOT NULL
        );`,
        
        `CREATE TEMPORARY TABLE IF NOT EXISTS tempCARGO(
            id_cargo INT NOT NULL,
            nombre_cargo VARCHAR(50) NOT NULL
        );`,
        

        `CREATE TEMPORARY TABLE IF NOT EXISTS tempDEPARTAMENTO(
            id_departamento INT NOT NULL,
            nombre_departamento VARCHAR(50) NOT NULL
        );`,
        
        `CREATE TEMPORARY TABLE IF NOT EXISTS tempMESA(
            id_mesa INT NOT NULL,
            id_departamento INT NOT NULL
        );`,
        
        `CREATE TEMPORARY TABLE IF NOT EXISTS tempCIUDADANO(
            dpi VARCHAR(13) NOT NULL,
            nombre VARCHAR(50)  NOT NULL,
            apellido VARCHAR(50) NOT NULL,
            direccion VARCHAR(100) NOT NULL,
            telefono VARCHAR(10) NOT NULL,
            edad INT NOT NULL,
            genero VARCHAR(1) NOT NULL
        );`,
        
        `CREATE TEMPORARY TABLE IF NOT EXISTS tempVOTO(
            id_voto INT NOT NULL,
            dpi VARCHAR(13) NOT NULL,
            id_mesa INT NOT NULL,
            fecha_voto DATETIME NOT NULL
        );`,

        `CREATE TEMPORARY TABLE IF NOT EXISTS tempDETALLE_VOTO(
            id_voto INT NOT NULL,
            id_candidato INT NOT NULL,
            id_detalle INT NOT NULL AUTO_INCREMENT PRIMARY KEY
        )`
    ];
}

export const createTables = ()=> {
}

export const insertDataToRealTables = ()=> [
    `INSERT INTO DEPARTAMENTO SELECT * FROM tempDEPARTAMENTO;`,
    `INSERT INTO CARGO SELECT * FROM tempCARGO;`,
    `INSERT INTO PARTIDO SELECT * FROM tempPARTIDO;`,
    `INSERT INTO CIUDADANO SELECT * FROM tempCIUDADANO;`,
    `INSERT INTO MESA SELECT * FROM tempMESA;`,
    `INSERT INTO CANDIDATO SELECT * FROM tempCANDIDATO;`,
    `INSERT INTO VOTO SELECT * FROM tempVOTO;`,
    `INSERT INTO DETALLE_VOTO(id_voto, id_candidato) SELECT id_voto, id_candidato FROM tempDETALLE_VOTO;`,
]
