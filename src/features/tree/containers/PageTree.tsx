import React, { useCallback } from 'react'
import { useRecoilValue } from 'recoil';
import SortableTree from '../components/SortableTree'
import { getTreeByNodeId } from '../state';
import { useMoveNode } from '../state/tree.hooks';

export interface PageTreeProps {
  id: string;
}

export default function PageTree({ id }: PageTreeProps) {
  const tree = useRecoilValue(getTreeByNodeId({
    nodeId: id,
    isRootNode: true
  }));
  const moveNode = useMoveNode();

  const handleDragEnd = useCallback((
    activeId: string,
    oldParentId: string,
    newParentId: string,
    newIndex: number,
  ) => {
    moveNode(
      activeId,
      oldParentId,
      newParentId,
      newIndex,
    );
  }, []);

  return (
    <SortableTree tree={tree} onDragEnd={handleDragEnd} rootNodeId={id} />
  )
}
