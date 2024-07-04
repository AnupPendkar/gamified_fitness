DO $$ BEGIN
 CREATE TYPE "intensity" AS ENUM('1', '2', '3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "status" ADD VALUE '0';--> statement-breakpoint
ALTER TYPE "status" ADD VALUE '1';--> statement-breakpoint
ALTER TABLE "set" ADD COLUMN "intensity" "intensity";--> statement-breakpoint
ALTER TABLE "set" ADD COLUMN "weight" integer;