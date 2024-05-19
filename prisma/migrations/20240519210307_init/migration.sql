/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Veiculo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Veiculo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Viagem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Viagem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `motoristaId` on the `Veiculo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `Viagem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `veiculoId` on the `Viagem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_motoristaId_fkey";

-- DropForeignKey
ALTER TABLE "Viagem" DROP CONSTRAINT "Viagem_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Viagem" DROP CONSTRAINT "Viagem_veiculoId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "motoristaId",
ADD COLUMN     "motoristaId" INTEGER NOT NULL,
ADD CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Viagem" DROP CONSTRAINT "Viagem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL,
DROP COLUMN "veiculoId",
ADD COLUMN     "veiculoId" INTEGER NOT NULL,
ADD CONSTRAINT "Viagem_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
