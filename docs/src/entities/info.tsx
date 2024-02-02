import React, { type FC } from 'react'

import { type PopoverProps } from '@radix-ui/react-popover'
import { Info as InfoIcon } from 'lucide-react'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'

interface InfoProps extends PopoverProps {}

export const Info: FC<InfoProps> = ({ children, ...props }) => {
  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground w-auto h-auto p-1 ml-1 align-middle mb-px"
        >
          <InfoIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  )
}
