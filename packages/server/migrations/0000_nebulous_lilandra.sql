CREATE TABLE `auth` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`password_digest` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`email_confirmed_at` integer,
	`deleted_at` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `client` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`auth_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`auth_id`) REFERENCES `auth`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `auth_email_unique` ON `auth` (`email`);