DROP SEQUENCE IF EXISTS "public"."numero_heroe";
DROP SEQUENCE IF EXISTS "public"."numero_comentario";
DROP SEQUENCE IF EXISTS "public"."numero_usuario";
DROP TABLE IF EXISTS "public"."heroes";
DROP TABLE IF EXISTS "public"."comentarios";
DROP TABLE IF EXISTS "public"."usuarios";
CREATE SEQUENCE "numero_heroe" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
CREATE SEQUENCE "numero_comentario" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
CREATE SEQUENCE "numero_usuario" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
CREATE TABLE "heroes" (
  "id_heroe" int4 NOT NULL DEFAULT nextval('numero_heroe'::regclass),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "rol" varchar(255) COLLATE "pg_catalog"."default",
  "ulti" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "heroes" OWNER TO "postgres";
CREATE TABLE "comentarios" (
  "id_comentario" int4 NOT NULL DEFAULT nextval('numero_comentario'::regclass),
  "id_user" int4,
  "id_heroe" int4,
  "comentario" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "comentarios" OWNER TO "postgres";
CREATE TABLE "usuarios" (
  "id_usuario" int4 NOT NULL DEFAULT nextval('numero_usuario'::regclass),
  "usuario" varchar(255) COLLATE "pg_catalog"."default",
  "clave" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "usuarios" OWNER TO "postgres";
BEGIN;
LOCK TABLE "public"."heroes" IN SHARE MODE;
DELETE FROM "public"."heroes";
INSERT INTO "public"."heroes" ("id_heroe","nombre","rol","ulti") VALUES (1, 'ana', 'healer', 'potenciador'),(2, 'ashe', 'dps', 'bob'),(3, 'baptiste', 'healer', 'amplificador'),(4, 'bastion', 'dps', 'mortero'),(5, 'brigitte', 'healer', 'potenciador'),(6, 'cassidy', 'dps', 'sin perdon'),(7, 'dva', 'tank', 'explosion'),(8, 'doomfist', 'tank', 'puño meteoro'),(9, 'echo', 'dps', 'copia'),(10, 'genji', 'dps', 'blade'),(11, 'hanzo', 'dps', 'dragones gemelos'),(12, 'junker queen', 'tank', 'masacre'),(13, 'junkrat', 'dps', 'rueda explosiva'),(14, 'lucio', 'healer', 'barrera de sonido'),(15, 'mei', 'dps', 'ventisca'),(16, 'mercy', 'healer', 'valkiria'),(17, 'moira', 'healer', ''),(18, 'orisa', 'tank', 'coalesencia'),(19, 'phara', 'dps', 'bombardeo'),(20, 'reaper', 'dps', 'espiral de la muerte'),(21, 'reinhardt', 'tank', 'seismo'),(22, 'roadhog', 'tank', 'juego sucio'),(23, 'sigma', 'tank', 'flujo gravitacional'),(24, 'sojourn', 'dps', 'supercargada'),(25, 'soldado 76', 'dps', 'visor tactico'),(26, 'sombra', 'dps', 'pem'),(27, 'symmetra', 'dps', 'barrera de fotones'),(28, 'torbjorn', 'dps', 'fusion nucear'),(29, 'tracer', 'dps', 'bomba de pulso'),(30, 'widowmaker', 'dps', 'infravision'),(31, 'winston', 'tank', 'rabia primigenia'),(32, 'wreacking ball', 'tank', 'campo de minas'),(33, 'zarya', 'tank', 'energia'),(34, 'zenyatta', 'healer', 'trascendencia'),(35,'kiriko','healer','kitsune');
COMMIT;
BEGIN;
LOCK TABLE "public"."comentarios" IN SHARE MODE;
DELETE FROM "public"."comentarios";
INSERT INTO "public"."comentarios" ("id_comentario","id_user","id_heroe","comentario") VALUES (1, 1, 1, 'Muy buena healer'),(2, 2, 1, 'Me mata siempre deberian nerfearla'),(3, 3, 1, 'Yo no se ocuparla'),(4, 1, 2, 'Aguante el bob'),(5, 2, 2, 'Mas linda la loquita');
COMMIT;
BEGIN;
LOCK TABLE "public"."usuarios" IN SHARE MODE;
DELETE FROM "public"."usuarios";
INSERT INTO "public"."usuarios" ("id_usuario","usuario","clave") VALUES (1, 'yeyo', 'yeyo'), (2, 'marze', 'marze'), (3, 'riflexto', 'riflexto');
COMMIT;
ALTER TABLE "heroes" ADD CONSTRAINT "heroes_pkey" PRIMARY KEY ("id_heroe");
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id_comentario");
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario");
ALTER TABLE "comentarios" ADD CONSTRAINT "fk_commit_heroe" FOREIGN KEY ("id_heroe") REFERENCES "public"."heroes" ("id_heroe") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "comentarios" ADD CONSTRAINT "fk_commit_user" FOREIGN KEY ("id_user") REFERENCES "public"."usuarios" ("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER SEQUENCE "numero_heroe"
OWNED BY "heroes"."id_heroe";
SELECT setval('"numero_heroe"', 2, false);
ALTER SEQUENCE "numero_heroe" OWNER TO "postgres";
ALTER SEQUENCE "numero_comentario"
OWNED BY "comentarios"."id_comentario";
SELECT setval('"numero_comentario"', 12, true);
ALTER SEQUENCE "numero_comentario" OWNER TO "postgres";
ALTER SEQUENCE "numero_usuario"
OWNED BY "usuarios"."id_usuario";
SELECT setval('"numero_usuario"', 2, true);
ALTER SEQUENCE "numero_usuario" OWNER TO "postgres";