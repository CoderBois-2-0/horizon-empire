CREATE TABLE "resource_junctions" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"resource_id" varchar(36) NOT NULL,
	"inventory_id" varchar(36) NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "resource_junctions" ADD CONSTRAINT "resource_junctions_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_junctions" ADD CONSTRAINT "resource_junctions_inventory_id_resource_inventories_id_fk" FOREIGN KEY ("inventory_id") REFERENCES "public"."resource_inventories"("id") ON DELETE no action ON UPDATE no action;