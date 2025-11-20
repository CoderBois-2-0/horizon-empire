ALTER TABLE "audit_placed_building" RENAME COLUMN "placed_building_id" TO "building_id";--> statement-breakpoint
ALTER TABLE "audit_placed_building" DROP CONSTRAINT "audit_placed_building_placed_building_id_placed_buildings_id_fk";
--> statement-breakpoint
ALTER TABLE "audit_placed_building" ADD CONSTRAINT "audit_placed_building_building_id_placed_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."placed_buildings"("id") ON DELETE no action ON UPDATE no action;