/*
  Warnings:

  - You are about to drop the column `end_at` on the `event_dates` table. All the data in the column will be lost.
  - You are about to drop the column `start_at` on the `event_dates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event_dates" DROP COLUMN "end_at",
DROP COLUMN "start_at";

-- CreateTable
CREATE TABLE "time_ranges" (
    "id" SERIAL NOT NULL,
    "event_date_id" INTEGER NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "time_ranges_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "time_ranges" ADD CONSTRAINT "time_ranges_event_date_id_fkey" FOREIGN KEY ("event_date_id") REFERENCES "event_dates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
