import { defineStore } from 'pinia';
import { IJsonProperty } from '@/types/json';

type State = {
  root: IJsonProperty;
};

const parseNodes = (root: IJsonProperty, path: string): IJsonProperty => {
  let parent = root;
  const pathElements = path.split('|').map((index) => parseInt(index, 10));
  while (parent.path !== path) {
    if (!parent.children) {
      throw new Error(`Expected to find child at path ${path}`);
    }

    parent = parent.children[pathElements[parent.offset]];
    if (parent === undefined) {
      throw new Error(`Expected to find an element in ${JSON.stringify(root)} at ${path}`);
    }
  }

  return parent;
};

const useBuilderStore = defineStore('json-builder', {
  state: (): State => ({
    root: {
      name: 'root',
      value: '',
      index: -1,
      offset: 0,
      path: '',
      children: [],
    },
  }),
  actions: {
    addChild(parentPath: string): void {
      const parent = parseNodes(this.root, parentPath);

      const newChild: IJsonProperty = {
        name: '',
        value: '',
        children: [],
        index: parent.children.length,
        offset: parent.offset + 1,
        path:
          parentPath === ''
            ? parent.children.length.toString()
            : `${parentPath}|${parent.children.length}`,
      };

      parent.children.push(newChild);
    },
    updateProperty(property: IJsonProperty): void {
      const lastPipeIndex = property.path.lastIndexOf('|');
      const parentPath = property.path.substring(0, lastPipeIndex);
      const itemIndex = parseInt(property.path.substring(lastPipeIndex + 1), 10);

      const parent = parseNodes(this.root, parentPath);
      parent.children[itemIndex] = property;
    },
  },
});

export default useBuilderStore;
