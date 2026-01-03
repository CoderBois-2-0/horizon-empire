import UserDocumentHandler from "$db/document/user/handler";
import CitySQLHandler from "$db/sql/city/handler";
import { makeNeo4jDriver } from "$db/graph/neo4j";
import { CityGraphHandler } from "$db/graph/city/handler";
import { TCityRequest } from "./types";

interface ICityService {
  createCity: (userID: string, cityRequest: TCityRequest) => Promise<void>;
}

function createSQLService(dbURL: string): ICityService {
  const cityHandler = new CitySQLHandler(dbURL);

  return {
    createCity: async (userID, cityRequest) => {
      cityHandler.createCity({
        ...cityRequest,
        userID,
        cityName: cityRequest.name,
      });
    },
  };
}

function createDocumentService(dbURL: string): ICityService {
  const userHandler = new UserDocumentHandler(dbURL);

  return {
    createCity: async (userID, cityRequest) => {
      await userHandler.createCity(userID, {
        ...cityRequest,
        map: {
          type: cityRequest.mapType,
          size: cityRequest.mapSize,
        },
      });
    },
  };
}

function createGraphService(): ICityService {
  const driver = makeNeo4jDriver();
  const cityHandler = new CityGraphHandler(driver);

  return {
    createCity: async (userID, cityRequest) => {
      await cityHandler.createCity({
        name: cityRequest.name,
        userID,
        mapType: cityRequest.mapType,
        mapSize: cityRequest.mapSize,
      } as any);
    },
  };
}

export {
  ICityService,
  createSQLService,
  createDocumentService,
  createGraphService,
};
