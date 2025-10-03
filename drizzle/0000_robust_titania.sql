CREATE TABLE "users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"username" varchar(16) NOT NULL,
	"password" varchar(72) NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
