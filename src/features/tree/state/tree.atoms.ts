import { atom, AtomEffect, atomFamily, DefaultValue, selectorFamily } from "recoil";
import { getNodeById } from ".";
import { Node, Tree } from '../tree.types';

export const nodeAtom = atomFamily<Node | null, string>({
  key: 't3/tree/nodeAtom',
  default: getNodeById,
});

const localStorageEffect =
  (key: string): AtomEffect<Set<string>> =>
    ({
      setSelf,
      onSet,
    }: {
      setSelf: (newValue: Set<string>) => void;
      onSet: (param: (newValue: Set<string> | DefaultValue, _: unknown, isReset: boolean) => void) => void;
    }) => {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(new Set(JSON.parse(savedValue)));
      }

      onSet((newValue, _, isReset) => {
        if (newValue instanceof DefaultValue || isReset) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify([...newValue]));
        }
      });
    };

export const collapsedNodeIdSetAtom = atom<Set<string>>({
  key: 't3/tree/collapsedNodeIdSetAtom',
  default: new Set(),
  effects: [localStorageEffect('multiCollapsedNodeIdsAtom')],
});

export const treeAtom = atom<Tree | null>({
  key: 't3/tree/treeAtom',
  default: null
})

export default {};