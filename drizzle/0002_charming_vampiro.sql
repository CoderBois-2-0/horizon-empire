CREATE TABLE "tile" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"type" "tile_type" NOT NULL,
	"region_id" varchar(36)
);
--> statement-breakpoint
ALTER TABLE "tile" ADD CONSTRAINT "tile_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE no action ON UPDATE no action;