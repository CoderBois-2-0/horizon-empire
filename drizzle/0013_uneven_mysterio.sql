CREATE TABLE "occupations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(32) NOT NULL,
	"placed_building_id" varchar(36) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "occupations" ADD CONSTRAINT "occupations_placed_building_id_placed_buildings_id_fk" 
FOREIGN KEY ("placed_building_id") REFERENCES "public"."placed_buildings"("id") ON DELETE cascade ON UPDATE no action;