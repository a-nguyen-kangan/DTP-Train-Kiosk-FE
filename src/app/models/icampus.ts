export interface ICampus {
  campusId: number;
  campusName: string;
  isSelected: boolean;
  trainstationId: number;
  trainstation: ITrainStation;
}
export interface ITrainStation
{
  trainstationId: number;
  trainstationName: string;
  travelTime: number;
  campuses: ICampus[];

}
