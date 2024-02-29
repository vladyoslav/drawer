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
          className="mb-px ml-1 h-auto w-auto p-1 align-middle text-muted-foreground"
        >
          <InfoIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  )
}
