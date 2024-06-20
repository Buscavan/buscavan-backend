/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `celular` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `motoristaId` on the `Veiculo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `motoristaCPF` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_motoristaId_fkey";

-- DropForeignKey
ALTER TABLE "Viagem" DROP CONSTRAINT "Viagem_usuarioId_fkey";

-- DropIndex
DROP INDEX "User_celular_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "celular",
DROP COLUMN "id",
ADD COLUMN     "phone" INTEGER,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("cpf");

-- AlterTable
ALTER TABLE "Veiculo" DROP COLUMN "motoristaId",
ADD COLUMN     "motoristaCPF" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Viagem" ALTER COLUMN "usuarioId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_motoristaCPF_fkey" FOREIGN KEY ("motoristaCPF") REFERENCES "User"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
