CREATE TYPE "public"."income_group" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TABLE "building_tile_types" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"buiilding_id" varchar(36) NOT NULL,
	"tile_type_id" varchar(36) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "placed_building_tile_types" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"placed_buiilding_id" varchar(36) NOT NULL,
	"tile_type_id" varchar(36) NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tile_types" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(10),
	CONSTRAINT "tile_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "tiles" RENAME COLUMN "type" TO "tile_type_id";--> statement-breakpoint
ALTER TABLE "tiles" ALTER COLUMN "tile_type_id" TYPE VARCHAR(36);
ALTER TABLE "tiles" DROP CONSTRAINT "tiles_region_id_regions_id_fk";
--> statement-breakpoint
ALTER TABLE "tiles" ALTER COLUMN "region_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "building_tile_types" ADD CONSTRAINT "building_tile_types_tile_type_id_tile_types_id_fk" FOREIGN KEY ("tile_type_id") REFERENCES "public"."tile_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building_tile_types" ADD CONSTRAINT "building_tile_types_buiilding_id_buildings_id_fk" FOREIGN KEY ("buiilding_id") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placed_building_tile_types" ADD CONSTRAINT "placed_building_tile_types_tile_type_id_tile_types_id_fk" FOREIGN KEY ("tile_type_id") REFERENCES "public"."tile_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placed_building_tile_types" ADD CONSTRAINT "placed_building_tile_types_placed_buiilding_id_placed_buildings_id_fk" FOREIGN KEY ("placed_buiilding_id") REFERENCES "public"."placed_buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tiles" ADD CONSTRAINT "tiles_tile_type_id_tile_types_id_fk" FOREIGN KEY ("tile_type_id") REFERENCES "public"."tile_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tiles" ADD CONSTRAINT "tiles_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "buildings" DROP COLUMN "buildable_on_tiles";--> statement-breakpoint
ALTER TABLE "placed_buildings" DROP COLUMN "build_on_tiles";--> statement-breakpoint
DROP TYPE "public"."tile_type";
