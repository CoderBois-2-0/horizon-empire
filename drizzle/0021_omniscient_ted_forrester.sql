ALTER TABLE "occupations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "occupations" CASCADE;--> statement-breakpoint
ALTER TABLE "building" RENAME TO "buildings";--> statement-breakpoint
ALTER TABLE "building_resource_cost" RENAME TO "building_resource_costs";--> statement-breakpoint
ALTER TABLE "inventory_resource_junctions" RENAME TO "inventory_resources";--> statement-breakpoint
ALTER TABLE "region_resource_cost" RENAME TO "region_resource_costs";--> statement-breakpoint
ALTER TABLE "building_resource_costs" DROP CONSTRAINT "building_resource_cost_building_id_building_id_fk";
--> statement-breakpoint
ALTER TABLE "building_resource_costs" DROP CONSTRAINT "building_resource_cost_resource_id_resources_id_fk";
--> statement-breakpoint
ALTER TABLE "persons" DROP CONSTRAINT "persons_housing_id_placed_buildings_id_fk";
--> statement-breakpoint
ALTER TABLE "placed_buildings" DROP CONSTRAINT "placed_buildings_building_id_building_id_fk";
--> statement-breakpoint
ALTER TABLE "region_resource_costs" DROP CONSTRAINT "region_resource_cost_region_id_regions_id_fk";
--> statement-breakpoint
ALTER TABLE "region_resource_costs" DROP CONSTRAINT "region_resource_cost_resource_id_resources_id_fk";
--> statement-breakpoint
ALTER TABLE "inventory_resources" DROP CONSTRAINT "inventory_resource_junctions_resource_id_resources_id_fk";
--> statement-breakpoint
ALTER TABLE "inventory_resources" DROP CONSTRAINT "inventory_resource_junctions_inventory_id_inventories_id_fk";
--> statement-breakpoint
ALTER TABLE "building_resource_costs" DROP CONSTRAINT "building_resource_cost_id_pk";--> statement-breakpoint
ALTER TABLE "region_resource_costs" DROP CONSTRAINT "region_resource_cost_id_pk";--> statement-breakpoint
ALTER TABLE "building_resource_costs" ADD CONSTRAINT "building_resource_costs_id_pk" PRIMARY KEY("id");--> statement-breakpoint
ALTER TABLE "region_resource_costs" ADD CONSTRAINT "region_resource_costs_id_pk" PRIMARY KEY("id");--> statement-breakpoint
ALTER TABLE "persons" ADD COLUMN "name" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "placed_buildings" ADD COLUMN "region_id" varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE "building_resource_costs" ADD CONSTRAINT "building_resource_costs_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building_resource_costs" ADD CONSTRAINT "building_resource_costs_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placed_buildings" ADD CONSTRAINT "placed_buildings_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placed_buildings" ADD CONSTRAINT "placed_buildings_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "region_resource_costs" ADD CONSTRAINT "region_resource_costs_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "region_resource_costs" ADD CONSTRAINT "region_resource_costs_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_resources" ADD CONSTRAINT "inventory_resources_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_resources" ADD CONSTRAINT "inventory_resources_inventory_id_inventories_id_fk" FOREIGN KEY ("inventory_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "persons" DROP COLUMN "age_category";--> statement-breakpoint
ALTER TABLE "persons" DROP COLUMN "income_group";--> statement-breakpoint
ALTER TABLE "persons" DROP COLUMN "housing_id";--> statement-breakpoint
DROP TYPE "public"."age_category";--> statement-breakpoint
DROP TYPE "public"."income_group";