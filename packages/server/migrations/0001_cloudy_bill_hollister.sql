CREATE TABLE `component_page` (
	`id` integer PRIMARY KEY NOT NULL,
	`component_id` integer,
	`page_id` integer,
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
	`created_at` integer DEFAULT '"2025-04-06T17:34:25.290Z"' NOT NULL
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
CREATE TABLE `landing_page.template` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE INDEX `page_component_idx` ON `component_page` (`page_id`,`component_id`);