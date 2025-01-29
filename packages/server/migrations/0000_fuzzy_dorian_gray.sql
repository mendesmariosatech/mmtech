CREATE TABLE `address` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`street_address` text NOT NULL,
	`complement` text,
	`state_or_province` text NOT NULL,
	`city` text NOT NULL,
	`postal_code` text NOT NULL,
	`country` text NOT NULL,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `auth` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`email_confirmed_at` integer,
	`deleted_at` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `business_customers` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`business_id` text NOT NULL,
	`customer_id` text NOT NULL,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `business` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`client_id` text NOT NULL,
	`name` text NOT NULL,
	`address_id` text,
	`description` text,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON UPDATE no action ON DELETE cascade
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
	`content` text,
	`css` text NOT NULL,
	`created_at` integer DEFAULT '"2025-01-29T01:27:24.982Z"'
);
--> statement-breakpoint
CREATE TABLE `customer` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`auth_id` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`auth_id`) REFERENCES `auth`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `customer_attendee` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`customer_id` text NOT NULL,
	`event_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `event` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`client_id` text NOT NULL,
	`business_id` text NOT NULL,
	`address_id` text,
	`title` text NOT NULL,
	`description` text,
	`date` integer NOT NULL,
	`time` integer,
	`location` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON UPDATE no action ON DELETE cascade
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
CREATE UNIQUE INDEX `auth_email_unique` ON `auth` (`email`);--> statement-breakpoint
CREATE INDEX `page_component_idx` ON `component_page` (`page_id`,`component_id`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `landing_page.components` (`type`);