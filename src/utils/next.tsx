import dynamic from 'next/dynamic'
import React, { FC, PropsWithChildren } from 'react'

const NoSsrContainer: FC<PropsWithChildren> = ({ children }) => <>{children}</>

export const NoSsr = dynamic(() => Promise.resolve(NoSsrContainer), {
	ssr: false,
})
