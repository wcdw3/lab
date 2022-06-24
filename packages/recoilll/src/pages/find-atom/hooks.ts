import { useRecoilCallback } from "recoil";
import { User, userAtom } from "./atoms";
import { user } from "./selectors";

export const useInsertBulkUsers = () => useRecoilCallback(({ set }) => (users: User[]) => {
  users.map((u) => {
    set(user(u.id), u);
  });
}, []);