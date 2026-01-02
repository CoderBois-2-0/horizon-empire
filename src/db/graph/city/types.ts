export interface CityDTO {
  id: string;
  name: string;
  userID: string;
  mapID: string;
}

export interface CreateCityInput {
  name: string;
  userID: string;
  mapID: string;
}

export interface CreateCityPayload {
  city: CityDTO;
}
