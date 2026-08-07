/*
  Warnings:

  - You are about to drop the column `contraseña` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "contraseña",
ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'default';
