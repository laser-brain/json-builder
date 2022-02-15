export interface IJsonProperty {
  name: string;
  value: string;
  children: IJsonProperty[],
  offset: number,
  path: string,
  isArray: boolean,
  [key: string]: string | number | boolean | IJsonProperty[]
}
