CREATE TYPE "public"."job_type" AS ENUM('office', 'firefighter', 'medical', 'enforcement', 'teacher', 'service', 'industrial');--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(32) NOT NULL,
	"type" "job_type" NOT NULL,
	"income" real NOT NULL,
	"person_id" varchar(36),
	"placed_building_id" varchar(36)
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_placed_building_id_placed_buildings_id_fk" FOREIGN KEY ("placed_building_id") REFERENCES "public"."placed_buildings"("id") ON DELETE no action ON UPDATE no action;