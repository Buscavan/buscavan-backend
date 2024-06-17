/*
  Warnings:

  - You are about to drop the column `destino` on the `Viagem` table. All the data in the column will be lost.
  - You are about to drop the column `origem` on the `Viagem` table. All the data in the column will be lost.
  - You are about to drop the `cidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `estado` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[fotoMotoristaUrl]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fotoCnhUrl]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fotoPassageiroUrl]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fotoVeiculoUrl]` on the table `Veiculo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fotoDestinoUrl]` on the table `Viagem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fotoCnhUrl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoMotoristaUrl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoPassageiroUrl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoVeiculoUrl` to the `Veiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelo` to the `Veiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinoId` to the `Viagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoDestinoUrl` to the `Viagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origemId` to the `Viagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `Viagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fotoCnhUrl" TEXT NOT NULL,
ADD COLUMN     "fotoMotoristaUrl" TEXT NOT NULL,
ADD COLUMN     "fotoPassageiroUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Veiculo" ADD COLUMN     "fotoVeiculoUrl" TEXT NOT NULL,
ADD COLUMN     "modelo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Viagem" DROP COLUMN "destino",
DROP COLUMN "origem",
ADD COLUMN     "comentarioId" INTEGER,
ADD COLUMN     "destinoId" INTEGER NOT NULL,
ADD COLUMN     "fotoDestinoUrl" TEXT NOT NULL,
ADD COLUMN     "origemId" INTEGER NOT NULL,
ADD COLUMN     "valor" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "cidade";

-- DropTable
DROP TABLE "estado";

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentCommentId" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_parentCommentId_idx" ON "Comment"("parentCommentId");

-- CreateIndex
CREATE UNIQUE INDEX "User_fotoMotoristaUrl_key" ON "User"("fotoMotoristaUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_fotoCnhUrl_key" ON "User"("fotoCnhUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_fotoPassageiroUrl_key" ON "User"("fotoPassageiroUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_fotoVeiculoUrl_key" ON "Veiculo"("fotoVeiculoUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Viagem_fotoDestinoUrl_key" ON "Viagem"("fotoDestinoUrl");

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_origemId_fkey" FOREIGN KEY ("origemId") REFERENCES "Cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
