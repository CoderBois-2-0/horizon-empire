import type { Driver } from "neo4j-driver";
import { CITY_CYPHER } from "./cypher";
import type { CityDTO, CreateCityInput, CreateCityPayload } from "./types";

type ResolverContext = {
  driver: Driver;
};

export function makeCityResolvers(driver: Driver) {
  const ctx: ResolverContext = { driver };

  return {
    Query: {
      // Fetch a single city by its ID, including its user and map relationships
      city: async (
        _parent: unknown,
        args: { id: string }
      ): Promise<CityDTO | null> => {
        const session = ctx.driver.session();
        try {
          const res = await session.executeRead((tx) =>
            tx.run(CITY_CYPHER.getById, { id: args.id })
          );
          const record = res.records[0];
          return record ? (record.get("city") as CityDTO) : null;
        } finally {
          await session.close();
        }
      },
    },

    Mutation: {
      // Create a new city and link it to an existing user and map
      createCity: async (
        _parent: unknown,
        args: { input: CreateCityInput }
      ): Promise<CreateCityPayload> => {
        const session = ctx.driver.session();
        try {
          const res = await session.executeWrite((tx) =>
            tx.run(CITY_CYPHER.create, {
              name: args.input.name,
              userID: args.input.userID,
              mapID: args.input.mapID,
            })
          );

          const record = res.records[0];
          if (!record) {
            // Mirrors SQL foreign key failure (user or map does not exist)
            throw new Error("Unable to create city: user or map not found.");
          }

          return { city: record.get("city") as CityDTO };
        } finally {
          await session.close();
        }
      },

      // Delete a city by its ID and remove all its graph relationships
      deleteCity: async (
        _parent: unknown,
        args: { id: string }
      ): Promise<string> => {
        const session = ctx.driver.session();
        try {
          const res = await session.executeWrite((tx) =>
            tx.run(CITY_CYPHER.deleteById, { id: args.id })
          );
          const record = res.records[0];
          if (!record) throw new Error("City not found.");
          return record.get("id") as string;
        } finally {
          await session.close();
        }
      },
    },
  };
}
