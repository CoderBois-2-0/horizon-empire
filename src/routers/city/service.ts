import UserDocumentHandler from "$db/document/user/handler";
import CitySQLHandler from "$db/sql/city/handler";
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

export { ICityService, createSQLService, createDocumentService };
