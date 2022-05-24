import React, { CSSProperties } from 'react'
import { Button, HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import { MdFiberManualRecord } from 'react-icons/md';
import { CSS } from '@dnd-kit/utilities';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';
import TreeItem from './TreeItem';
import { iOS } from '../../../utils/device.util';

export interface SortableTreeItemProps {
  id: UniqueIdentifier;
  value: string;
  depth: number;
  indentationWidth: number;
}

const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting, wasDragging }) => !(isSorting || wasDragging);

export default function SortableTreeItem({ id, value, depth, indentationWidth }: SortableTreeItemProps) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <TreeItem
      value={value}
      ref={setDraggableNodeRef}
      wrapperRef={setDroppableNodeRef}
      style={style}
      depth={depth}
      ghost={isDragging}
      disableSelection={iOS}
      disableInteraction={isSorting}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      indentationWidth={indentationWidth}
    />
  )
}
