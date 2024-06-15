/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Veiculo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Veiculo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Viagem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Viagem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `motoristaId` to the `Veiculo` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `capacidade` on the `Veiculo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `usuarioId` to the `Viagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `veiculoId` to the `Viagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_pkey",
ADD COLUMN     "motoristaId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "capacidade",
ADD COLUMN     "capacidade" INTEGER NOT NULL,
ADD CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Viagem" DROP CONSTRAINT "Viagem_pkey",
ADD COLUMN     "usuarioId" INTEGER NOT NULL,
ADD COLUMN     "veiculoId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Viagem_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Cidade" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(120),
    "uf" INTEGER,
    "ibge" INTEGER,
    "lat_lon" VARCHAR(200),
    "cod_tom" SMALLINT DEFAULT 0,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60),
    "uf" VARCHAR(2),
    "ibge" INTEGER,
    "pais" INTEGER,
    "ddd" JSON,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_uf_fkey" FOREIGN KEY ("uf") REFERENCES "Estado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
