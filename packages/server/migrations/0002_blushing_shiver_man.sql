CREATE TABLE `component_page` (
	`id` integer PRIMARY KEY NOT NULL,
	`component_id` integer,
	`page_id` text(128),
	`order` integer NOT NULL,
	`css_override` text,
	`content_override` text,
	FOREIGN KEY (`component_id`) REFERENCES `landing_page.components`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`page_id`) REFERENCES `landing_page.page`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `landing_page.components` (
	`id` integer PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`content` text NOT NULL,
	`css` text NOT NULL,
	`created_at` integer DEFAULT '"2026-02-02T00:31:55.168Z"' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `landing_page.page` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`template_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`template_id`) REFERENCES `landing_page.template`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `plan_master` (
	`planMasterId` text(128) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `plan_master_tasks` (
	`planMasterTasksId` text(128) PRIMARY KEY NOT NULL,
	`plan_master_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`plan_master_id`) REFERENCES `plan_master`(`planMasterId`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `landing_page.template` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`business_id` text NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`description` text,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `page_component_idx` ON `component_page` (`page_id`,`component_id`);