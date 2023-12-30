/*
  Warnings:

  - Added the required column `anonymous_participant_id` to the `attendances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attendances" ADD COLUMN     "anonymous_participant_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "attendances_anonymous_participant_id_idx" ON "attendances"("anonymous_participant_id");
