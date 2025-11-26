export interface IJob {
  _id: string;
  name: string;
  type: string;
  income: number;
  placed_building_id?: string;
}
