/*
  Warnings:

  - You are about to drop the column `senha` on the `admins` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nome` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senhaHash` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admins` DROP COLUMN `senha`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `senhaHash` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `admins_email_key` ON `admins`(`email`);
