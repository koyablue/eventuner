/*
  Warnings:

  - You are about to drop the column `event_date_id` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `attendances` table. All the data in the column will be lost.
  - Added the required column `time_range_id` to the `attendances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_event_date_id_fkey";

-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_event_id_fkey";

-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "event_date_id",
DROP COLUMN "event_id",
ADD COLUMN     "time_range_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_time_range_id_fkey" FOREIGN KEY ("time_range_id") REFERENCES "time_ranges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
