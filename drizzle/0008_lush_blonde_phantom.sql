CREATE TYPE "public"."age_category" AS ENUM('newborn', 'child', 'teen', 'young adult', 'adult', 'senior');--> statement-breakpoint
CREATE TYPE "public"."income_group" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TABLE "persons" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"age_category" "age_category" NOT NULL,
	"income_group" "income_group" NOT NULL,
	"housing_id" varchar(36) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "persons" ADD CONSTRAINT "persons_housing_id_placed_buildings_id_fk" FOREIGN KEY ("housing_id") REFERENCES "public"."placed_buildings"("id") ON DELETE no action ON UPDATE no action;