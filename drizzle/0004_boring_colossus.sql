CREATE TABLE "cities" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"map_id" varchar(36) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_map_id_map_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."map"("id") ON DELETE cascade ON UPDATE no action;