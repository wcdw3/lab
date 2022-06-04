import { selectorFamily } from "recoil";
import { list } from "../../../constants/data";
import { Node, Tree } from "../tree.types";
import { collapsedNodeIdSetAtom, nodeAtom } from ".";

export const getNodeById = selectorFamily<Node | null, string>({
  key: 'p3/tree/getNodeById',
  get: (id) => () => {
    const node = list.find(i => i.id === id);
    if (!node) {
      return null;
    }

    const childrenIds: string[] = [];
    list.forEach(i => {
      if (i.parentId === id) {
        childrenIds[i.indexOfChildren] = i.id;
      }
    });

    return {
      id,
      childrenIds,
    }
  }
})

export const getChildrenIds = selectorFamily<string[], string>({
  key: 'p3/tree/getChildrenIds',
  get: (id) => ({ get }) => {
    const n = get(nodeAtom(id));
    return n?.childrenIds || [];
  }
});

export const isCollapsedByNodeId = selectorFamily<boolean, string>({
  key: 'p3/tree/isCollapsedByNodeId',
  get: (id) => ({ get }) => {
    const collapsedNodeIdSet = get(collapsedNodeIdSetAtom);
    return collapsedNodeIdSet.has(id);
  }
});

export const getTreeByNodeId = selectorFamily<
  Tree,
  {
    nodeId: string,
    isRootNode: boolean
  }>({
    key: 'p3/tree/getTree',
    get: ({ nodeId, isRootNode }) => ({ get }) => {
      const collapsed = get(isCollapsedByNodeId(nodeId));
      let children: Tree[] = [];

      if (isRootNode || !collapsed) {
        const childrenIds = get(getChildrenIds(nodeId));
        children = childrenIds.map(
          ci => get(getTreeByNodeId({ nodeId: ci, isRootNode: false }))
        );
      }

      return {
        id: nodeId,
        collapsed,
        children,
      };
    }
  })
