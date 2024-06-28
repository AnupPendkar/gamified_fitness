ALTER TABLE "users" ADD COLUMN "profile_img" varchar;--> statement-breakpoint
ALTER TABLE "user_details" DROP COLUMN IF EXISTS "profile_img";