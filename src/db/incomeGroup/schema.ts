import { pgEnum } from "drizzle-orm/pg-core";

const incomeGroup = pgEnum("income_group", ["low", "medium", "high"]);

export { incomeGroup };
