/*
  Warnings:

  - Added the required column `motoristaId` to the `Veiculo` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `capacidade` on the `Veiculo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `usuarioId` to the `Viagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `veiculoId` to the `Viagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Veiculo" ADD COLUMN     "motoristaId" TEXT NOT NULL,
DROP COLUMN "capacidade",
ADD COLUMN     "capacidade" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Viagem" ADD COLUMN     "usuarioId" TEXT NOT NULL,
ADD COLUMN     "veiculoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
