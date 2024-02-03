/*
  Warnings:

  - You are about to drop the column `anonymous_participant_id` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `participant_name` on the `attendances` table. All the data in the column will be lost.
  - Added the required column `anonymous_attendee_id` to the `attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attendee_name` to the `attendances` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "attendances_anonymous_participant_id_idx";

-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "anonymous_participant_id",
DROP COLUMN "participant_name",
ADD COLUMN     "anonymous_attendee_id" TEXT NOT NULL,
ADD COLUMN     "attendee_name" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "attendances_anonymous_attendee_id_idx" ON "attendances"("anonymous_attendee_id");
