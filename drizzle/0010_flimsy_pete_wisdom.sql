ALTER TABLE "cities" DROP CONSTRAINT "cities_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "cities" DROP CONSTRAINT "cities_map_id_map_id_fk";
--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_map_id_map_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."map"("id") ON DELETE no action ON UPDATE no action;