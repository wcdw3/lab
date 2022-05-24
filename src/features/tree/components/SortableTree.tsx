import React from 'react'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableTreeItem from './SortableTreeItem'
import { TreeNode } from '../tree.types';
import { Stack } from '@chakra-ui/react';

export interface SortableTreeProps {
  treeNodes: TreeNode[];
  indentationWidth: number;
}

export default function SortableTree({ treeNodes, indentationWidth }: SortableTreeProps) {
  return (
    <DndContext>
      <SortableContext items={treeNodes.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
        <Stack>
          {treeNodes.map(n => (
            <SortableTreeItem
              key={n.id}
              id={n.id}
              value={`${n.id} / ${n.type}`}
              indentationWidth={indentationWidth}
              depth={0}
            />)
          )}
        </Stack>
      </SortableContext>
    </DndContext>
  )
}
