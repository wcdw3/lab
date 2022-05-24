import { atom, atomFamily } from "recoil";

export const currentRootNodeIdAtom = atom<string>({
  key: 'tree/currentRootNodeIdAtom',
  default: '',
});

export const nodeAtom = atomFamily<Node | undefined, string>({
  key: 'tree/nodeAtom',
  default: undefined
})

export default {};