export interface IJsonProperty {
  propertyName: string;
  propertyValue: string;
  offset: number,
  path: string,
  [key: string]: IJsonProperty | string | number | undefined
}
