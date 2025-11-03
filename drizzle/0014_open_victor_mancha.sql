ALTER TABLE "resource_inventories" RENAME TO "inventories";--> statement-breakpoint
ALTER TABLE "cities" DROP CONSTRAINT "cities_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "cities" DROP CONSTRAINT "cities_map_id_map_id_fk";
--> statement-breakpoint
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_placed_building_id_placed_buildings_id_fk";
--> statement-breakpoint
ALTER TABLE "persons" DROP CONSTRAINT "persons_housing_id_placed_buildings_id_fk";
--> statement-breakpoint
ALTER TABLE "placed_buildings" DROP CONSTRAINT "placed_buildings_building_id_building_id_fk";
--> statement-breakpoint
ALTER TABLE "placed_buildings" DROP CONSTRAINT "placed_buildings_city_id_cities_id_fk";
--> statement-breakpoint
ALTER TABLE "inventories" DROP CONSTRAINT "resource_inventories_city_id_cities_id_fk";
--> statement-breakpoint
ALTER TABLE "resource_junctions" DROP CONSTRAINT "resource_junctions_inventory_id_resource_inventories_id_fk";
--> statement-breakpoint
ALTER TABLE "resource_junctions" DROP CONSTRAINT "resource_junctions_resource_id_resources_id_fk";
--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_map_id_map_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."map"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_placed_building_id_placed_buildings_id_fk" FOREIGN KEY ("placed_building_id") REFERENCES "public"."placed_buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "persons" ADD CONSTRAINT "persons_housing_id_placed_buildings_id_fk" FOREIGN KEY ("housing_id") REFERENCES "public"."placed_buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placed_buildings" ADD CONSTRAINT "placed_buildings_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placed_buildings" ADD CONSTRAINT "placed_buildings_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_junctions" ADD CONSTRAINT "resource_junctions_inventory_id_inventories_id_fk" FOREIGN KEY ("inventory_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_junctions" ADD CONSTRAINT "resource_junctions_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;