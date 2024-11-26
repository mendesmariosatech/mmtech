ALTER TABLE `event` RENAME COLUMN `time` TO `startTime`;--> statement-breakpoint
ALTER TABLE `auth` ADD `agree_terms` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `event` ADD `endTime` integer;--> statement-breakpoint
ALTER TABLE `event` DROP COLUMN `location`;