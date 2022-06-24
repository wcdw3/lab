import { arrayMove } from "@dnd-kit/sortable";
import { useRecoilCallback } from "recoil";
import { nodeAtom, collapsedNodeIdSetAtom } from ".";

export const useSetCollapsedNode = () =>
  useRecoilCallback(({ set }) => (id: string, collapsed: boolean) => {
    if (collapsed) {
      set(collapsedNodeIdSetAtom, (prev) => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });
    } else {
      set(collapsedNodeIdSetAtom, (prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        }
        return newSet;
      });

    }

  }, []);

export const useMoveNode = () =>
  useRecoilCallback(({ set }) => (
    srcId: string,
    oldParentId: string,
    newParentId: string,
    newIndex: number
  ) => {
    set(nodeAtom(newParentId), (prev) => {
      if (!prev) {
        return prev;
      }

      const newNode = {
        ...prev,
        childrenIds: [...prev.childrenIds]
      };

      if (newParentId === oldParentId) {
        const srcIdx = newNode.childrenIds.findIndex(cid => cid === srcId);
        newNode.childrenIds = arrayMove(newNode.childrenIds, srcIdx, newIndex);
      } else {
        newNode.childrenIds.splice(newIndex, 0, srcId);
      }

      return newNode;
    });

    if (newParentId !== oldParentId) {
      set(nodeAtom(oldParentId), (prev) => {
        if (!prev) {
          return prev;
        }

        const newNode = {
          ...prev,
          childrenIds: [...prev.childrenIds]
        };
        const srcIdx = newNode.childrenIds.findIndex(cid => cid === srcId);
        newNode.childrenIds.splice(srcIdx, 1);
        return newNode;
      });
    }
  }, []);
