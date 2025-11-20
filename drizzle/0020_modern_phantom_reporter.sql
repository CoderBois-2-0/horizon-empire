ALTER TABLE "regions" DROP CONSTRAINT "regions_map_id_maps_id_fk";
--> statement-breakpoint
ALTER TABLE "tiles" DROP CONSTRAINT "tiles_region_id_regions_id_fk";
--> statement-breakpoint
ALTER TABLE "regions" ADD CONSTRAINT "regions_map_id_maps_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."maps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tiles" ADD CONSTRAINT "tiles_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE cascade ON UPDATE no action;