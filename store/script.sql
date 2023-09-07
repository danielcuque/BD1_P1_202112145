DROP DATABASE IF EXISTS Proyecto1;

CREATE DATABASE IF NOT EXISTS Proyecto1;

USE Proyecto1;

CREATE TABLE IF NOT EXISTS PARTIDO(
    id_partido INT NOT NULL,
    nombre_partido VARCHAR(50) NOT NULL,
    siglas VARCHAR(10) NOT NULL,
    fecha_fundacion DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS CANDIDATO(
    id_candidato INT NOT NULL,
    nombre_candidato VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    id_partido INT NOT NULL,
    id_cargo INT NOT NULL
);

CREATE TABLE IF NOT EXISTS CARGO(
    id_cargo INT NOT NULL,
    nombre_cargo VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS DEPARTAMENTO(
    id_departamento INT NOT NULL,
    nombre_departamento VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS MESA(
    id_mesa INT NOT NULL,
    id_departamento INT NOT NULL
);

CREATE TABLE IF NOT EXISTS CIUDADANO(
    dpi VARCHAR(13) NOT NULL,
    nombre VARCHAR(50)  NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    edad INT NOT NULL,
    genero VARCHAR(1) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    telefono VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS VOTO(
    id_voto INT NOT NULL,
    fecha_voto DATE NOT NULL,
    dpi VARCHAR(13) NOT NULL,
    id_mesa INT NOT NULL
);

CREATE TABLE IF NOT EXISTS DETALLE_VOTO(
    id_detalle INT NOT NULL,
    id_voto INT NOT NULL,
    id_candidato INT NOT NULL
);

ALTER TABLE PARTIDO ADD CONSTRAINT PK_PARTIDO PRIMARY KEY (id_partido);
ALTER TABLE CANDIDATO ADD CONSTRAINT PK_CANDIDATO PRIMARY KEY (id_candidato);
ALTER TABLE CARGO ADD CONSTRAINT PK_CARGO PRIMARY KEY (id_cargo);
ALTER TABLE DEPARTAMENTO ADD CONSTRAINT PK_DEPARTAMENTO PRIMARY KEY (id_departamento);
ALTER TABLE MESA ADD CONSTRAINT PK_MESA PRIMARY KEY (id_mesa);
ALTER TABLE CIUDADANO ADD CONSTRAINT PK_CIUDADANO PRIMARY KEY (dpi);
ALTER TABLE VOTO ADD CONSTRAINT PK_VOTO PRIMARY KEY (id_voto);
ALTER TABLE DETALLE_VOTO ADD CONSTRAINT PK_DETALLE_VOTO PRIMARY KEY (id_detalle);

ALTER TABLE CANDIDATO ADD CONSTRAINT FK_CANDIDATO_PARTIDO FOREIGN KEY (id_partido) REFERENCES PARTIDO(id_partido);
ALTER TABLE CANDIDATO ADD CONSTRAINT FK_CANDIDATO_CARGO FOREIGN KEY (id_cargo) REFERENCES CARGO(id_cargo);
ALTER TABLE MESA ADD CONSTRAINT FK_MESA_DEPARTAMENTO FOREIGN KEY (id_departamento) REFERENCES DEPARTAMENTO(id_departamento);
ALTER TABLE VOTO ADD CONSTRAINT FK_VOTO_MESA FOREIGN KEY (id_mesa) REFERENCES MESA(id_mesa);
ALTER TABLE VOTO ADD CONSTRAINT FK_VOTO_CIUDADANO FOREIGN KEY (dpi) REFERENCES CIUDADANO(dpi);
ALTER TABLE DETALLE_VOTO ADD CONSTRAINT FK_DETALLE_VOTO_VOTO FOREIGN KEY (id_voto) REFERENCES VOTO(id_voto);
ALTER TABLE DETALLE_VOTO ADD CONSTRAINT FK_DETALLE_VOTO_CANDIDATO FOREIGN KEY (id_candidato) REFERENCES CANDIDATO(id_candidato);
