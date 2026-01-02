import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Driver } from "neo4j-driver";

import { makeCityResolvers } from "./city/resolvers";
import { makeUserResolvers } from "./user/resolvers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadGraphTypeDefs(): string[] {
  const base = `
    scalar DateTime
    type Query { _empty: String }
    type Mutation { _empty: String }
  `;

  const citySDL = readFileSync(
    path.join(__dirname, "./city/schema.graphql"),
    "utf8"
  );

  const userSDL = readFileSync(
    path.join(__dirname, "./user/schema.graphql"),
    "utf8"
  );

  return [base, citySDL, userSDL];
}

export function loadGraphResolvers(driver: Driver): Array<Record<string, any>> {
  return [makeCityResolvers(driver), makeUserResolvers(driver)];
}
