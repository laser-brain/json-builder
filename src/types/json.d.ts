export interface IJsonProperty {
  name: string;
  value: string;
  children: IJsonProperty[],
  offset: number,
  path: string
  [key: string]: string | number | IJsonProperty[]
}
