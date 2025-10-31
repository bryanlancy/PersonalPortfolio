'use client'

import { useRef } from 'react'

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

export { usePerformanceMode, type PerformanceMode } from './usePerformanceMode'
export { useScrollTriggerPause } from './useScrollTriggerPause'
export { useViewportVisibility } from './useViewportVisibility'
