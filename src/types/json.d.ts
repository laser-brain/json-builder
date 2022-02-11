export interface IJsonProperty {
  index: number,
  name: string;
  value: string;// | IJsonProperty[]
  children: IJsonProperty[],
  offset: number,
  path: string
}
