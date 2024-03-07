'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ReactNode } from 'react'

interface ProvidersProps {
	children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => <NextUIProvider>{children}</NextUIProvider>
