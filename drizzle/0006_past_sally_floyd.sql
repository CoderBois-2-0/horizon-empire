CREATE TABLE "placed_buildings" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"building_id" varchar(36) NOT NULL,
	"city_id" varchar(36) NOT NULL,
	"build_on_tiles" "tile_type"[] NOT NULL
);
--> statement-breakpoint
ALTER TABLE "placed_buildings" ADD CONSTRAINT "placed_buildings_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placed_buildings" ADD CONSTRAINT "placed_buildings_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;