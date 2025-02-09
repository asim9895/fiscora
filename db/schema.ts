import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const income_category = sqliteTable("income_category", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});
export const expense_category = sqliteTable("expense_category", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});
export const income = sqliteTable("income", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  amount: integer("amount").notNull(),
  date: text("date").notNull(),
  category_id: integer("category_id")
    .notNull()
    .references(() => income_category.id),
});
export const expense = sqliteTable("expense", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  amount: integer("amount").notNull(),
  date: text("date").notNull(),
  category_id: integer("category_id")
    .notNull()
    .references(() => expense_category.id),
});

export type IncomeCategory = typeof income_category.$inferSelect;
export type ExpenseCategory = typeof expense_category.$inferSelect;

export type Income = typeof income.$inferSelect;
export type Expense = typeof expense.$inferSelect;
