/*
  Warnings:

  - Changed the type of `type` on the `Rent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RentType" AS ENUM ('SUPIR', 'LEPAS_KUNCI');

-- AlterTable
ALTER TABLE "Rent" DROP COLUMN "type",
ADD COLUMN     "type" "RentType" NOT NULL;
