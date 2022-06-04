import { useSortable } from '@dnd-kit/sortable';
import React from 'react'
import { CSS } from '@dnd-kit/utilities';
import TreeItem, { GTreeItemProps } from './TreeItem';

export interface SortableTreeItemProps extends GTreeItemProps {
  id: string;
}

export default function SortableTreeItem({ id, ...props }: SortableTreeItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TreeItem
      ref={setNodeRef}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      style={style}
      {...props}
    />
  );
}
