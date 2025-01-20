/*
  Warnings:

  - You are about to drop the column `tagId` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the `_QuoteToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_authorId_fkey";

-- DropForeignKey
ALTER TABLE "_QuoteToTag" DROP CONSTRAINT "_QuoteToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuoteToTag" DROP CONSTRAINT "_QuoteToTag_B_fkey";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "tagId";

-- DropTable
DROP TABLE "_QuoteToTag";

-- CreateTable
CREATE TABLE "QuoteTag" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "QuoteTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuoteTag_quoteId_tagId_key" ON "QuoteTag"("quoteId", "tagId");

-- AddForeignKey
ALTER TABLE "QuoteTag" ADD CONSTRAINT "QuoteTag_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteTag" ADD CONSTRAINT "QuoteTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;
