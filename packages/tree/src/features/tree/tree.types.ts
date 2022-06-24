export interface Node {
  id: string;
  childrenIds: string[];
}

export interface Tree {
  id: string;
  children: Tree[];
  collapsed: boolean;
}

export interface FlattenedItem extends Tree {
  parentId: string;
  depth: number;
  index: number;
}