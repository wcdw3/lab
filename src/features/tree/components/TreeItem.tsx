import React, { forwardRef, HTMLAttributes } from 'react'
import { Text, HStack, IconButton, Icon, Box } from '@chakra-ui/react'
import { MdFiberManualRecord } from 'react-icons/md'

export interface TreeItemProps {
  value: string;
}

export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: string;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLDivElement): void;
}

const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      style,
      value,
      wrapperRef,
    },
    ref
  ) => {
    return (
      <Box ref={wrapperRef} pl={`${indentationWidth * depth}px`}>
        <HStack style={style} ref={ref}>
          <IconButton
            {...handleProps}
            icon={<Icon as={MdFiberManualRecord} />}
            aria-label="handler"
            rounded="full"
            variant="ghost"
          />
          <Text>{value}</Text>
        </HStack>
      </Box>
    )
  }
);

export default TreeItem;