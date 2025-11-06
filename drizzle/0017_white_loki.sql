CREATE TABLE "building_resource_cost" (
	"building_id" varchar(36) NOT NULL,
	"resource_id" varchar(36) NOT NULL,
	"amount" integer NOT NULL,
	CONSTRAINT "building_resource_cost_building_id_resource_id_pk" PRIMARY KEY("building_id","resource_id")
);
--> statement-breakpoint
ALTER TABLE "building_resource_cost" ADD CONSTRAINT "building_resource_cost_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building_resource_cost" ADD CONSTRAINT "building_resource_cost_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building" DROP COLUMN "resource_cost";