import { Stack } from '@chakra-ui/react';
import { DndContext, DragEndEvent, DragMoveEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import React, { useCallback, useMemo, useState } from 'react'
import { createPortal } from 'react-dom';
import PageTreeItem from '../containers/PageTreeItem';
import treeConst from '../tree.const';
import { Tree } from '../tree.types';
import { flattenTree, getProjection, removeChildrenOf } from '../tree.util';

export interface SortableTreeProps {
  tree: Tree;
  rootNodeId: string;
  onDragEnd: (
    activeId: string,
    oldParentId: string,
    newParentId: string,
    newIndex: number,
  ) => void;
}

export default function SortableTree({ tree, rootNodeId, onDragEnd }: SortableTreeProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [overId, setOverId] = useState<string>('');
  const [offsetLeft, setOffsetLeft] = useState(0);
  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(tree, rootNodeId);
    const collapsedItems = flattenedTree.reduce<string[]>(
      (acc, { children, collapsed, id }) =>
        collapsed && children.length ? [...acc, id] : acc,
      []
    );

    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems
    );
  }, [tree, activeId, rootNodeId]);

  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null;

  const projected =
    activeId && overId
      ? getProjection(
        flattenedItems,
        activeId,
        overId,
        offsetLeft,
        treeConst.INDENTION_WIDTH,
        rootNodeId,
      )
      : null;

  const resetState = useCallback(() => {
    setActiveId('');
    setOverId('');
  }, []);

  const handleDragStart = useCallback(({ active: { id } }: DragStartEvent) => {
    setActiveId(id as string);
    setOverId(id as string);
    document.body.style.setProperty('cursor', 'grabbing');
  }, []);

  const handleDragMove = useCallback(({ delta }: DragMoveEvent) => {
    setOffsetLeft(delta.x);
  }, []);

  const handleDragOver = useCallback(({ over }: DragOverEvent) => {
    setOverId(over?.id as string ?? '');
  }, []);

  const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
    resetState();

    if (projected?.parentId && over?.id) {
      const { parentId } = projected;
      const activeIndex = flattenedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = flattenedItems[activeIndex];
      const newParentIndex = flattenedItems.findIndex(({ id }) => id === parentId)
      const newParentTreeItem = flattenedItems[newParentIndex];
      const newIndex = over.id === parentId ? 0 : newParentTreeItem.children.findIndex(c => c.id === over.id);

      onDragEnd(
        active.id as string,
        activeTreeItem.parentId,
        projected.parentId,
        newIndex < 0 ? newParentTreeItem.children.length : newIndex,
      );
    }

    document.body.style.setProperty('cursor', '');
  }, [projected?.parentId, flattenedItems]);


  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
    >
      <SortableContext items={flattenedItems.map(({ id }) => id)}>
        <Stack h="full">
          {flattenedItems.map(({ collapsed, id, depth }) =>
            <PageTreeItem
              key={id}
              id={id}
              collapsed={id === activeId ? true : collapsed}
              depth={id === activeId && projected ? projected.depth : depth}
            />
          )}
        </Stack>
        {createPortal(
          <DragOverlay>
            {activeId && activeItem ? (
              <PageTreeItem
                collapsed
                id={activeId}
                depth={activeItem.depth}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </SortableContext>
    </DndContext>
  );
}
