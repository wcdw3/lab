import { useRecoilCallback } from "recoil";
import { treeNodeAtom } from ".";
import { TreeNode } from "../tree.types";

export const useSetTreeNodes = () => useRecoilCallback(({ set }) => (nodes: TreeNode[]) => {
  nodes.forEach(n => {
    set(treeNodeAtom(n.id), n);
  });
}, []);