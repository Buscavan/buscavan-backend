-- CreateTable
CREATE TABLE "cidade" (
    "id" BIGSERIAL NOT NULL,
    "nome" VARCHAR(120),
    "uf" INTEGER,
    "ibge" INTEGER,
    "lat_lon" VARCHAR(200),
    "cod_tom" SMALLINT DEFAULT 0,

    CONSTRAINT "cidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado" (
    "id" BIGSERIAL NOT NULL,
    "nome" VARCHAR(60),
    "uf" VARCHAR(2),
    "ibge" INTEGER,
    "pais" INTEGER,
    "ddd" JSON,

    CONSTRAINT "estado_pkey" PRIMARY KEY ("id")
);
