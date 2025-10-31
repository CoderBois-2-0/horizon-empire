CREATE TABLE "occupation" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(32) NOT NULL,
	"placed_building_id" varchar(36)
);
--> statement-breakpoint
ALTER TABLE "occupation" ADD CONSTRAINT "occupation_placed_building_id_placed_buildings_id_fk" FOREIGN KEY ("placed_building_id") REFERENCES "public"."placed_buildings"("id") ON DELETE no action ON UPDATE no action;