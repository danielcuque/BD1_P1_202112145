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

export const consults:{
    [key: number]: string
} = {
    1: `SELECT
        CP.nombre_candidato AS "Presidente",
        CV.nombre_candidato AS "Vicepresidente",
        P.nombre_partido AS partido
        FROM
            CANDIDATO CP
        JOIN
            CANDIDATO CV ON CP.id_partido = CV.id_partido
        JOIN
            PARTIDO P ON CP.id_partido = P.id_partido
        WHERE
            CP.id_cargo = 1
            AND CV.id_cargo = 2;`,
    2: `
        SELECT
        P.nombre_partido AS Partido,
        COUNT(C.id_candidato) AS "Cantidad de Candidatos a Diputados"

        FROM
            CANDIDATO C
        JOIN
            PARTIDO P On C.id_partido = P.id_partido
        WHERE
            C.id_cargo = 3 OR C.id_cargo = 4 or C.id_cargo = 5
        GROUP BY
            P.nombre_partido
    `,
    3: `
        SELECT
        C.nombre_candidato AS 'Alcalde',
        P.nombre_partido AS 'Partido'
        FROM CANDIDATO C
        INNER JOIN PARTIDO P ON C.id_partido = P.id_partido
        WHERE C.id_cargo = 6
        ORDER BY P.nombre_partido;
    `,
    4: `
        SELECT
        P.nombre_partido AS "Partido",
        COUNT(C.id_candidato) AS "Cantidad de candidatos"
        FROM CANDIDATO C
        JOIN PARTIDO P ON C.id_partido = P.id_partido
        WHERE C.id_cargo != -1
        GROUP BY P.nombre_partido
        ORDER BY COUNT(C.id_candidato);
    `,
    5: `
        SELECT
        D.nombre_departamento AS Departamento,
        COUNT(V.id_voto) AS Votos
        FROM VOTO V
        JOIN MESA M ON M.id_mesa = V.id_mesa
        JOIN DEPARTAMENTO D ON D.id_departamento = M.id_departamento
        GROUP BY D.nombre_departamento;
    `,
    6: `
        SELECT
        C.nombre_candidato AS "Votos nulos",
        COUNT(DV.id_detalle) AS "Cantidad"
        FROM DETALLE_VOTO DV
        INNER JOIN CANDIDATO C ON C.id_candidato = DV.id_candidato
        WHERE DV.id_candidato = -1;
    `,
    7: `
        SELECT
        C.edad AS 'Edad',
        COUNT(C.edad) AS 'Cantidad'
        FROM
            CIUDADANO C
        GROUP BY
            C.edad
        ORDER BY
            COUNT(C.edad) DESC
        LIMIT 10;
    `,
    8: `
        SELECT
        C.nombre_candidato AS Candidato,
        COUNT(DV.id_candidato) AS Votos
        FROM DETALLE_VOTO as DV
        INNER JOIN CANDIDATO as C ON C.id_candidato = DV.id_candidato
        WHERE C.id_cargo = 1
        GROUP BY DV.id_candidato
        ORDER BY votos DESC
        LIMIT 10;
    `,
    9: `
        SELECT
        M.id_mesa AS 'Mesa',
        D.nombre_departamento AS 'Departamento',
        COUNT(V.id_mesa) AS 'Cantidad de votos'
        FROM
            MESA M
        INNER JOIN
            DEPARTAMENTO D ON M.id_departamento = D.id_departamento
        INNER JOIN
            VOTO V ON M.id_mesa = V.id_mesa
        GROUP BY
            M.id_mesa
        ORDER BY
            COUNT(V.id_mesa) DESC
        LIMIT 5;
    `,
    10: `
        SELECT DATE_FORMAT(fecha_voto, '%H') AS Hora, COUNT(*) AS Cantidad
        FROM VOTO
        GROUP BY Hora
        ORDER BY Cantidad DESC
        LIMIT 5;
    `,
    11: `   
        SELECT
        C.genero as Genero,
        COUNT(V.id_voto) as Cantidad
        FROM VOTO V
        INNER JOIN CIUDADANO C ON C.dpi = V.dpi
        GROUP BY C.genero;
    `,
}