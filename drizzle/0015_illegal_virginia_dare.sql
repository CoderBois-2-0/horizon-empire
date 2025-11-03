DROP VIEW "public"."region_with_total_tiles";--> statement-breakpoint
ALTER TABLE "map" RENAME TO "maps";--> statement-breakpoint
ALTER TABLE "region" RENAME TO "regions";--> statement-breakpoint
ALTER TABLE "tile" RENAME TO "tiles";--> statement-breakpoint
ALTER TABLE "cities" DROP CONSTRAINT "cities_map_id_map_id_fk";
--> statement-breakpoint
ALTER TABLE "regions" DROP CONSTRAINT "region_map_id_map_id_fk";
--> statement-breakpoint
ALTER TABLE "tiles" DROP CONSTRAINT "tile_region_id_region_id_fk";
--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_map_id_maps_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."maps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "regions" ADD CONSTRAINT "regions_map_id_maps_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."maps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tiles" ADD CONSTRAINT "tiles_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE VIEW "public"."region_with_total_tiles" AS (select "id", "name", "map_id", total_region_tiles("id") as "total_tiles" from "regions");