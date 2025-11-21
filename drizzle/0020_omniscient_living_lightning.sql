ALTER TABLE "jobs" ALTER COLUMN "placed_building_id" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_jobs_person_id" ON "jobs" USING btree ("person_id");--> statement-breakpoint
CREATE INDEX "idx_jobs_unoccupied" ON "jobs" USING btree ("id") WHERE "jobs"."person_id" is null;