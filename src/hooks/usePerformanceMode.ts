import { useState, useEffect, useRef } from 'react'

/**
 * Performance mode levels based on detected frame times
 */
export type PerformanceMode = 'high' | 'medium' | 'low'

interface PerformanceStats {
	mode: PerformanceMode
	averageFrameTime: number
	frameCount: number
}

/**
 * Custom hook to detect CPU performance and adjust quality settings accordingly
 * Measures average frame time over a rolling window to detect throttled CPU
 *
 * @param samples - Number of frame time samples to collect (default: 30)
 * @returns Object containing current performance mode and stats
 */
export function usePerformanceMode(samples: number = 30): PerformanceStats {
	const [mode, setMode] = useState<PerformanceMode>('high')
	const frameTimes = useRef<number[]>([])
	const lastFrameTime = useRef<number>(performance.now())
	const rafId = useRef<number | null>(null)

	useEffect(() => {
		const measureFrame = () => {
			const currentTime = performance.now()
			const frameTime = currentTime - lastFrameTime.current
			lastFrameTime.current = currentTime

			// Add frame time to array
			frameTimes.current.push(frameTime)

			// Keep only the last N samples
			if (frameTimes.current.length > samples) {
				frameTimes.current.shift()
			}

			// Calculate average frame time
			if (frameTimes.current.length >= 10) {
				// Need at least 10 samples for reliable measurement
				const average =
					frameTimes.current.reduce((sum, time) => sum + time, 0) /
					frameTimes.current.length

				// Determine performance mode based on average frame time
				// High: < 20ms (60+ fps)
				// Medium: 20-40ms (25-60 fps)
				// Low: > 40ms (< 25 fps)
				let newMode: PerformanceMode
				if (average < 20) {
					newMode = 'high'
				} else if (average < 40) {
					newMode = 'medium'
				} else {
					newMode = 'low'
				}

				// Only update if mode changed (to prevent unnecessary re-renders)
				if (newMode !== mode) {
					setMode(newMode)
				}
			}

			rafId.current = requestAnimationFrame(measureFrame)
		}

		// Start measurement
		rafId.current = requestAnimationFrame(measureFrame)

		return () => {
			if (rafId.current) {
				cancelAnimationFrame(rafId.current)
			}
		}
	}, [samples, mode])

	const averageFrameTime =
		frameTimes.current.length > 0
			? frameTimes.current.reduce((sum, time) => sum + time, 0) /
			  frameTimes.current.length
			: 16.67 // Default to 60fps

	return {
		mode,
		averageFrameTime,
		frameCount: frameTimes.current.length,
	}
}

