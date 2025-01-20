-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "likedBy" TEXT[] DEFAULT ARRAY[]::TEXT[];
