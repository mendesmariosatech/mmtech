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
