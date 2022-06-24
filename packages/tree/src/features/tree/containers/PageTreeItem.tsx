import React, { useCallback } from 'react'
import SortableTreeItem from '../components/SortableTreeItem';
import { useSetCollapsedNode } from '../state/tree.hooks';

export interface PageTreeItemProps {
  id: string;
  collapsed: boolean;
  depth: number;
}

export default function PageTreeItem({ id, collapsed, depth }: PageTreeItemProps) {
  const setCollapsedNode = useSetCollapsedNode();

  const handleCollapse = useCallback(() => {
    setCollapsedNode(id, !collapsed);
  }, [id, collapsed]);

  return (
    <SortableTreeItem
      id={id}
      collapsed={collapsed}
      value={id}
      onCollapse={handleCollapse}
      depth={depth}
    />
  );
}
