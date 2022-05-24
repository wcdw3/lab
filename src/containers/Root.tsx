import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import SortableTree from '../features/tree/components/SortableTree'
import { useSetTreeNodes } from '../features/tree/state'

export default function Root() {
  const setTreeNodes = useSetTreeNodes();
  useEffect(() => {
    setTreeNodes([{
      id: 'tn-1',
      childrenIds: ['tn-2'],
      type: 'vision'
    }, {
      id: 'tn-2',
      childrenIds: ['tn-3'],
      type: 'goal'
    }, {
      id: 'tn-3',
      childrenIds: ['tn-4', 'tn-5'],
      type: 'project'
    }, {
      id: 'tn-4',
      childrenIds: [],
      type: 'vision'
    }, {
      id: 'tn-5',
      childrenIds: [],
      type: 'vision'
    }, {
      id: 'tn-6',
      childrenIds: [],
      type: 'vision'
    }, {
      id: 'tn-7',
      childrenIds: ['tn-8', 'tn-9'],
      type: 'goal'
    }, {
      id: 'tn-8',
      childrenIds: [],
      type: 'todo'
    }, {
      id: 'tn-9',
      childrenIds: [],
      type: 'maybe'
    }]);
  }, []);

  return (
    <Box p="8">
      <SortableTree treeNodes={[{
        id: 'tn-1',
        childrenIds: ['tn-2'],
        type: 'vision'
      }]}
        indentationWidth={24}
      />
    </Box>
  )
}
