import type { Driver } from "neo4j-driver";
import type { CityDTO, CreateCityInput, CreateCityPayload } from "./types";
import { CityGraphHandler } from "./handler";

export function makeCityResolvers(driver: Driver) {
  const handler = new CityGraphHandler(driver);

  return {
    Query: {
      // Fetch a single city by its ID, including its user and map relationships
      city: async (
        _parent: unknown,
        args: { id: string }
      ): Promise<CityDTO | null> => {
        return handler.getCityById(args.id);
      },
    },

    Mutation: {
      // Create a new city and link it to an existing user and map
      createCity: async (
        _parent: unknown,
        args: { input: CreateCityInput }
      ): Promise<CreateCityPayload> => {
        const city = await handler.createCity(args.input);
        return { city };
      },

      // Delete a city by its ID and remove all its graph relationships
      deleteCity: async (
        _parent: unknown,
        args: { id: string }
      ): Promise<string> => {
        return handler.deleteCity(args.id);
      },
    },
  };
}
