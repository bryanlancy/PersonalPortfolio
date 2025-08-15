'use client'

import { BannerContext } from '@/context/bannerContext'
import { useContext, useRef } from 'react'

export function useBannerScrollProgress(projectName: string) {
	const {
		animState: [{ [projectName]: animProgress }],
	} = useContext(BannerContext)

	return animProgress
}

export const useDebounce: (
	func: Function,
	timeout: number
) => (args: any[]) => void = (func, timeout = 100) => {
	const timer = useRef<NodeJS.Timeout>()
	return (...args) => {
		clearTimeout(timer.current)
		timer.current = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}
