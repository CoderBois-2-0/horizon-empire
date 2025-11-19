CREATE TYPE "public"."placed_building_action_type" AS ENUM('create', 'remove');--> statement-breakpoint
CREATE TABLE "audit_placed_building" (
	"id" varchar(36) NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"placed_building_id" varchar(36) NOT NULL,
	"action_type" "placed_building_action_type",
	"created" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "audit_placed_building_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "region_resource_cost" (
	"id" varchar(36) NOT NULL,
	"region_id" varchar(36) NOT NULL,
	"resource_id" varchar(36) NOT NULL,
	"amount" integer NOT NULL,
	CONSTRAINT "region_resource_cost_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
DROP VIEW "public"."region_with_total_tiles";--> statement-breakpoint
ALTER TABLE "building_resource_cost" DROP CONSTRAINT "building_resource_cost_building_id_building_id_fk";
--> statement-breakpoint
ALTER TABLE "building_resource_cost" DROP CONSTRAINT "building_resource_cost_resource_id_resources_id_fk";
--> statement-breakpoint
ALTER TABLE "building_resource_cost" DROP CONSTRAINT "building_resource_cost_building_id_resource_id_pk";--> statement-breakpoint
ALTER TABLE "building_resource_cost" ADD COLUMN "id" varchar(36);--> statement-breakpoint
ALTER TABLE "building_resource_cost" ADD CONSTRAINT "building_resource_cost_id_pk" PRIMARY KEY("id");--> statement-breakpoint
ALTER TABLE "regions" ADD COLUMN "is_unlocked" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "audit_placed_building" ADD CONSTRAINT "audit_placed_building_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_placed_building" ADD CONSTRAINT "audit_placed_building_placed_building_id_placed_buildings_id_fk" FOREIGN KEY ("placed_building_id") REFERENCES "public"."placed_buildings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "region_resource_cost" ADD CONSTRAINT "region_resource_cost_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "region_resource_cost" ADD CONSTRAINT "region_resource_cost_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building_resource_cost" ADD CONSTRAINT "building_resource_cost_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building_resource_cost" ADD CONSTRAINT "building_resource_cost_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building" DROP COLUMN "resource_cost";--> statement-breakpoint
ALTER TABLE "maps" DROP COLUMN "starting_region_id";--> statement-breakpoint
CREATE VIEW "public"."region_with_total_tiles" AS (select "id", "name", "map_id", "is_unlocked", total_region_tiles("id") as "total_tiles" from "regions");
