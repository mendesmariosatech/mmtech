CREATE TABLE `landing_page.page` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`template_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`template_id`) REFERENCES `landing_page.template`(`id`) ON UPDATE no action ON DELETE cascade
);
