CREATE TABLE `expense` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` integer NOT NULL,
	`date` text NOT NULL,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `expense_category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `expense_category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `income` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` integer NOT NULL,
	`date` text NOT NULL,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `income_category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `income_category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
DROP TABLE `lists`;--> statement-breakpoint
DROP TABLE `tasks`;