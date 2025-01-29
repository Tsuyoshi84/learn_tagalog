CREATE TYPE "public"."word_category" AS ENUM('verb', 'adjective', 'noun');--> statement-breakpoint
-- CREATE TABLE "texts" (
-- 	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
-- 	"en" text NOT NULL,
-- 	"tl" text NOT NULL,
-- 	"level" smallint DEFAULT 1 NOT NULL
-- );
--> statement-breakpoint
-- CREATE TABLE "user_progress" (
-- 	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
-- 	"created_at" timestamp DEFAULT now() NOT NULL,
-- 	"text_id" uuid NOT NULL,
-- 	"user_id" uuid NOT NULL,
-- 	"memory_level" smallint DEFAULT 1 NOT NULL,
-- 	"last_answered_at" timestamp,
-- 	"next_due_date" timestamp DEFAULT now() NOT NULL
-- );
--> statement-breakpoint
CREATE TABLE "words" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"en" text NOT NULL,
	"tl" text NOT NULL,
	"category" "word_category" NOT NULL,
	"level" smallint DEFAULT 1 NOT NULL
);
--> statement-breakpoint
-- ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_text_id_texts_id_fk" FOREIGN KEY ("text_id") REFERENCES "public"."texts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
-- ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;