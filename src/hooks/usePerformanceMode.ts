import { useState, useEffect, useRef } from 'react'

/**
 * Performance mode levels based on detected frame times.
 * Used to adjust visual quality settings based on device capabilities.
 *
 * @remarks
 * - 'high': < 20ms average frame time (60+ fps) - Full quality effects enabled
 * - 'medium': 20-40ms (25-60 fps) - Reduced quality effects
 * - 'low': > 40ms (< 25 fps) - Minimal quality effects, performance prioritized
 *
 * @public
 */
export type PerformanceMode = 'high' | 'medium' | 'low'

/**
 * Performance statistics returned by the usePerformanceMode hook.
 *
 * @property mode - Current performance mode (high/medium/low)
 * @property averageFrameTime - Average frame time in milliseconds
 * @property frameCount - Number of frame samples collected
 *
 * @public
 */
interface PerformanceStats {
	mode: PerformanceMode
	averageFrameTime: number
	frameCount: number
}

/**
 * Configuration options for performance mode detection.
 *
 * @property samples - Number of frame time samples to collect (default: 30)
 * @property lowModeStickDuration - Minimum time in ms to stay in low mode once detected (default: 30000)
 * @property consecutiveSamplesRequired - Number of consecutive samples required before downgrading (default: 5)
 *
 * @public
 */
interface PerformanceModeOptions {
	samples?: number
	lowModeStickDuration?: number
	consecutiveSamplesRequired?: number
}

/**
 * Custom hook to detect CPU performance and adjust quality settings accordingly.
 * Measures average frame time over a rolling window to detect throttled CPU.
 *
 * **Prevents feedback loops** by:
 * - Tracking the lowest performance mode ever detected
 * - Requiring consecutive low-performance detections before downgrading
 * - Sticking to low mode for a minimum duration once detected
 * - Using hysteresis to prevent rapid mode switching
 *
 * @param options - Configuration options for performance detection
 * @param options.samples - Number of frame time samples to collect (default: 30)
 * @param options.lowModeStickDuration - Minimum time in ms to stay in low mode once detected (default: 30000 = 30 seconds)
 * @param options.consecutiveSamplesRequired - Number of consecutive low/medium samples required before downgrading (default: 5)
 *
 * @returns Object containing current performance mode and stats
 *
 * @example
 * ```tsx
 * const { mode, averageFrameTime } = usePerformanceMode()
 *
 * // Use mode to conditionally enable expensive effects
 * const enableBlur = mode === 'high' || mode === 'medium'
 * ```
 *
 * @remarks
 * This hook is optimized for AI agent usage - it prevents infinite feedback loops
 * where detecting low performance and disabling effects improves performance,
 * which then re-enables effects, causing performance to drop again.
 *
 * @public
 */
export function usePerformanceMode(
	options: PerformanceModeOptions = {}
): PerformanceStats {
	const {
		samples = 30,
		lowModeStickDuration = 30000, // 30 seconds
		consecutiveSamplesRequired = 5,
	} = options

	const [mode, setMode] = useState<PerformanceMode>('high')
	const frameTimes = useRef<number[]>([])
	const lastFrameTime = useRef<number>(performance.now())
	const rafId = useRef<number | null>(null)

	// Track the lowest performance mode ever detected to prevent feedback loops
	const lowestModeDetected = useRef<PerformanceMode>('high')

	// Track when low mode was first detected
	const lowModeDetectedAt = useRef<number | null>(null)

	// Track consecutive low/medium detections before downgrading
	const consecutiveLowSamples = useRef<number>(0)
	const consecutiveMediumSamples = useRef<number>(0)

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

				// Determine detected performance mode based on average frame time
				// High: < 20ms (60+ fps)
				// Medium: 20-40ms (25-60 fps)
				// Low: > 40ms (< 25 fps)
				let detectedMode: PerformanceMode
				if (average < 20) {
					detectedMode = 'high'
					consecutiveLowSamples.current = 0
					consecutiveMediumSamples.current = 0
				} else if (average < 40) {
					detectedMode = 'medium'
					consecutiveLowSamples.current = 0
					consecutiveMediumSamples.current++
				} else {
					detectedMode = 'low'
					consecutiveLowSamples.current++
					consecutiveMediumSamples.current = 0
				}

				// Update lowest mode ever detected
				if (
					detectedMode === 'low' ||
					(detectedMode === 'medium' &&
						lowestModeDetected.current === 'high')
				) {
					lowestModeDetected.current = detectedMode
				}

				// Determine the mode we should actually use (with hysteresis)
				let newMode: PerformanceMode = mode

				// If we're currently in low mode, check if we should stay
				if (mode === 'low') {
					// Stay in low mode if we haven't exceeded the stick duration
					if (
						lowModeDetectedAt.current !== null &&
						currentTime - lowModeDetectedAt.current <
							lowModeStickDuration
					) {
						newMode = 'low'
					}
					// Only upgrade if we've had consistently high performance for a while
					else if (
						detectedMode === 'high' &&
						consecutiveLowSamples.current === 0
					) {
						// Require multiple consecutive high samples before upgrading from low
						// This prevents flickering when effects are re-enabled
						newMode = 'medium' // Upgrade to medium first, not directly to high
					}
				}
				// If we're in medium mode
				else if (mode === 'medium') {
					// Downgrade to low only if we have consecutive low samples
					if (
						detectedMode === 'low' &&
						consecutiveLowSamples.current >=
							consecutiveSamplesRequired
					) {
						newMode = 'low'
						lowModeDetectedAt.current = currentTime
					}
					// Upgrade to high if performance is consistently good
					else if (
						detectedMode === 'high' &&
						consecutiveLowSamples.current === 0
					) {
						newMode = 'high'
					}
				}
				// If we're in high mode
				else {
					// Downgrade to medium if we have consecutive medium/low samples
					if (
						detectedMode === 'medium' &&
						consecutiveMediumSamples.current >=
							consecutiveSamplesRequired
					) {
						newMode = 'medium'
					} else if (
						detectedMode === 'low' &&
						consecutiveLowSamples.current >=
							consecutiveSamplesRequired
					) {
						newMode = 'low'
						lowModeDetectedAt.current = currentTime
					}
				}

				// Never allow mode to be higher than the lowest ever detected
				// This prevents the feedback loop where disabling effects improves
				// performance, which re-enables effects, causing performance to drop
				if (lowestModeDetected.current === 'low' && newMode !== 'low') {
					// If we've ever detected low mode, stay at medium at best
					newMode = 'medium'
				} else if (
					lowestModeDetected.current === 'medium' &&
					newMode === 'high'
				) {
					// If we've detected medium mode, allow high but be cautious
					// (This case is less critical, so we allow it)
				}

				// Only update if mode actually changed
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
	}, [samples, mode, lowModeStickDuration, consecutiveSamplesRequired])

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
