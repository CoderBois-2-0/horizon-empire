import { BuildingDocumentHandler } from "$db/document/building/handler";
import { BuildingHandler } from "$db/sql/building/handler";
import { IBuilding } from "$db/sql/building/types";

interface IBuildingService {
  getAll: () => Promise<IBuilding[]>;
}

function createSQLService(dbURL: string): IBuildingService {
  const buildingHandler = new BuildingHandler(dbURL);

  return {
    getAll: () => buildingHandler.getAll(),
  };
}

function createDocumentService(dbURL: string): IBuildingService {
  const buildingHandler = new BuildingDocumentHandler(dbURL);

  return {
    getAll: async () => {
      const buildings = await buildingHandler.getAll();

      return buildings.map((building) => ({
        id: building._id.toString(),
        name: building.name,
        buildingType: building.type,
        tilesUsed: building.tilesNeeded,
        maxEntities: building.maxPersons,
      }));
    },
  };
}

export { IBuildingService, createSQLService, createDocumentService };
