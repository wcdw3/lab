import React, { forwardRef, HTMLAttributes } from 'react'
import { Text, HStack, IconButton, Icon, Box } from '@chakra-ui/react'
import { MdArrowDownward, MdArrowRight, MdFiberManualRecord } from 'react-icons/md'
import treeConst from '../tree.const';

export interface GTreeItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  collapsed: boolean;
  value: string;
  onCollapse: () => void;
  handleProps?: any;
  depth: number;
}

const TreeItem = forwardRef<HTMLDivElement, GTreeItemProps>(
  (
    {
      collapsed,
      value,
      onCollapse,
      style,
      handleProps,
      depth
    },
    ref
  ) => {
    return (
      <HStack
        style={style}
        ref={ref}
        pl={`${depth * treeConst.INDENTION_WIDTH}px`}
      >
        <IconButton
          icon={<Icon as={collapsed ? MdArrowRight : MdArrowDownward} />}
          aria-label="collapse"
          rounded="full"
          variant="ghost"
          onClick={onCollapse}
        />
        <IconButton
          icon={<Icon as={MdFiberManualRecord} />}
          aria-label="handler"
          rounded="full"
          variant="ghost"
          {...handleProps}
        />
        <Text>{value}</Text>
      </HStack>
    );
  }
);

export default TreeItem;