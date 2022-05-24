import { atom, atomFamily } from "recoil";
import { TreeNode } from '../tree.types';

export const currentRootTreeNodeIdAtom = atom<string>({
  key: 'tree/currentRootTreeNodeIdAtom',
  default: '',
});

export const treeNodeAtom = atomFamily<TreeNode | undefined, string>({
  key: 'tree/treeNodeAtom',
  default: undefined
});

export default {};