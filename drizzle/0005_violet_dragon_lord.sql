CREATE TABLE "resource_inventories" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"city_id" varchar(36) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "resource_inventories" ADD CONSTRAINT "resource_inventories_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;