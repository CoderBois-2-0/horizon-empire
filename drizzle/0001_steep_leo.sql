CREATE TYPE "public"."map_size" AS ENUM('small', 'medium', 'large');--> statement-breakpoint
CREATE TYPE "public"."map_type" AS ENUM('forrest', 'arctic', 'desert', 'bay');--> statement-breakpoint
CREATE TYPE "public"."tile_type" AS ENUM('grass', 'rock', 'water', 'snow', 'sand', 'farmland');--> statement-breakpoint
CREATE TABLE "map" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"type" "map_type" NOT NULL,
	"map_size" "map_size" NOT NULL,
	"starting_region_id" varchar(36)
);
--> statement-breakpoint
CREATE TABLE "region" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(32) NOT NULL,
	"map_id" varchar(36) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "region" ADD CONSTRAINT "region_map_id_map_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."map"("id") ON DELETE no action ON UPDATE no action;