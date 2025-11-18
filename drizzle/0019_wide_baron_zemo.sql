CREATE TYPE "public"."placed_building_action_type" AS ENUM('create', 'remove');--> statement-breakpoint
CREATE TABLE "audit_placed_building" (
	"id" varchar(36) NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"placed_building_id" varchar(36) NOT NULL,
	"action_type" "placed_building_action_type",
	"created" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "audit_placed_building_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
ALTER TABLE "audit_placed_building" ADD CONSTRAINT "audit_placed_building_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_placed_building" ADD CONSTRAINT "audit_placed_building_placed_building_id_placed_buildings_id_fk" FOREIGN KEY ("placed_building_id") REFERENCES "public"."placed_buildings"("id") ON DELETE no action ON UPDATE no action;