ALTER TABLE "resource_junctions" RENAME TO "inventory_resource_junctions";--> statement-breakpoint
ALTER TABLE "inventory_resource_junctions" DROP CONSTRAINT "resource_junctions_resource_id_resources_id_fk";
--> statement-breakpoint
ALTER TABLE "inventory_resource_junctions" DROP CONSTRAINT "resource_junctions_inventory_id_inventories_id_fk";
--> statement-breakpoint
ALTER TABLE "inventory_resource_junctions" ADD CONSTRAINT "inventory_resource_junctions_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_resource_junctions" ADD CONSTRAINT "inventory_resource_junctions_inventory_id_inventories_id_fk" FOREIGN KEY ("inventory_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;