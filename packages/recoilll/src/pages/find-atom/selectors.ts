import { DefaultValue, selector, selectorFamily } from "recoil";
import { nameInputValue, User, userAtom, userIdsAtom } from "./atoms";

export const user = selectorFamily<User | null, string>({
  key: 'find-atom/user',
  get: (id) => ({ get }) => get(userAtom(id)),
  set: (id) => ({ set, reset }, newUser) => {
    if (newUser instanceof DefaultValue) {
      reset(userAtom(id));
      set(userIdsAtom, (prev) => { 
        const newUserIds = new Set(prev);
        newUserIds.delete(id);
        return newUserIds;
      });
      return;
    }

    set(userAtom(id), newUser);
    set(userIdsAtom, (prev) => {
      const newUserIds = new Set(prev);
      newUserIds.add(id)
      return newUserIds;
    });
  }
})

export const getUsersByNameInputValue = selector<User[]>({
  key: 'find-atom/getUsersByNameInputValue',
  get: ({ get }) => {
    const name = get(nameInputValue);
    const userIds = get(userIdsAtom);
    const ret: User[] = [];
    const regexp = new RegExp(name, 'g');
    [...userIds].forEach((uid) => {
      const u = get(user(uid));
      if (u && regexp.test(u.name)) {
        ret.push(u);
      }
    });

    return ret;
  }
})