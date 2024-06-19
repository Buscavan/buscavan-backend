/*
  Warnings:

  - You are about to drop the column `fotoMotoristaUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fotoPassageiroUrl` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fotoPerfilUrl]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_fotoMotoristaUrl_key";

-- DropIndex
DROP INDEX "User_fotoPassageiroUrl_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fotoMotoristaUrl",
DROP COLUMN "fotoPassageiroUrl",
ADD COLUMN     "fotoPerfilUrl" TEXT;

-- AlterTable
ALTER TABLE "Veiculo" ALTER COLUMN "fotoVeiculoUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Viagem" ALTER COLUMN "fotoDestinoUrl" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_fotoPerfilUrl_key" ON "User"("fotoPerfilUrl");
