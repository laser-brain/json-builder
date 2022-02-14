import { defineStore } from 'pinia';
import { IJsonProperty } from '@/types/json';

type State = {
  root: IJsonProperty;
};

const parseNodes = (root: IJsonProperty, path: string): IJsonProperty => {
  let parent = root;
  const pathElements = path.split('|');
  let pathIndex = 0;
  while (parent.path !== path) {
    const propertyName = pathElements[pathIndex];
    parent = JSON.parse(parent[propertyName] as string) as IJsonProperty;
    if (!parent) {
      throw new Error(
        `Expected to find child at ${propertyName} in object ${JSON.stringify(parent, null, 2)}`,
      );
    }
    pathIndex += 1;
  }

  return parent;
};

const useBuilderStore = defineStore('json-builder', {
  state: (): State => ({
    root: {
      propertyName: '',
      propertyValue: '',
      offset: 0,
      path: '',
    },
  }),
  actions: {
    addChild(parentPath: string): void {
      const parent = parseNodes(this.root, parentPath);

      const newChild: IJsonProperty = {
        propertyName: '',
        propertyValue: '',
        offset: parent.offset + 1,
        path: parentPath === '' ? '' : `${parentPath}|new`,
      };

      parent.new = JSON.stringify(newChild);
    },
    updateProperty(currentPath: string, property: IJsonProperty): void {
      const lastPipeIndex = property.path.lastIndexOf('|');
      const parentPath = property.path.substring(0, lastPipeIndex);
      const propertyName = parseInt(property.path.substring(lastPipeIndex + 1), 10);
      const oldName = currentPath.split('|').at(-1);

      const parent = parseNodes(this.root, parentPath);
      if (oldName) {
        parent[oldName] = undefined;
        parent[propertyName] = JSON.stringify(property);
      } else {
        parent.propertyName = property.propertyName;
        parent.propertyValue = property.propertyValue;
      }
    },
  },
});

export default useBuilderStore;
