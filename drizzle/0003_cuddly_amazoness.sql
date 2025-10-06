CREATE TYPE "public"."building_type" AS ENUM('housing', 'work', 'service', 'educational');--> statement-breakpoint
CREATE TABLE "building" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(32) NOT NULL,
	"resource_cost" real NOT NULL,
	"type" "building_type" NOT NULL,
	"tiles_used" integer NOT NULL,
	"max_entities" integer NOT NULL,
	"buildable_on_tiles" "tile_type"[] NOT NULL
);
