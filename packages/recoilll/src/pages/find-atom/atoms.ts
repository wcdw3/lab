import { atom, atomFamily } from "recoil";

export type User = {
  id: string;
  name: string;
};

export const userIdsAtom = atom<Set<string>>({
  key: 'find-atom/userIdsAtom',
  default: new Set()
});

export const userAtom = atomFamily<User | null, string>({
  key: 'find-atom/userAtom',
  default: null
});

export const nameInputValue = atom({
  key: 'find-atom/nameInputValue',
  default: ''
})