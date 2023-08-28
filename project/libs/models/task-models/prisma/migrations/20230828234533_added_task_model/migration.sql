-- CreateEnum
CREATE TYPE "StatusTask" AS ENUM ('New', 'Canceled', 'InWork', 'Done', 'Failed');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "statusTask" "StatusTask" NOT NULL DEFAULT 'New';
