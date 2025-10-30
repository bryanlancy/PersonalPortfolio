/**
 * Convert a hex color string (#rrggbb) into an RGB tuple.
 * @param hex - The hex color string (e.g. "#ff0000").
 * @returns A tuple [r, g, b] where each value is 0–255.
 */
function hexToRgb(hex: string): [number, number, number] {
	const cleanHex = hex.replace(/^#/, '')
	const bigint = parseInt(cleanHex, 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255
	return [r, g, b]
}

/**
 * Convert an RGB tuple into a hex color string.
 * @param r - Red channel (0–255).
 * @param g - Green channel (0–255).
 * @param b - Blue channel (0–255).
 * @returns A hex color string (e.g. "#ff0000").
 */
function rgbToHex(r: number, g: number, b: number): string {
	return (
		'#' +
		[r, g, b]
			.map(x => {
				const hex = x.toString(16)
				return hex.length === 1 ? '0' + hex : hex
			})
			.join('')
	)
}

/**
 * Generate an array of evenly spaced colors through multiple hex color stops.
 *
 * The gradient will include the first color and the last color, and will
 * smoothly interpolate across each adjacent pair of colors provided.
 *
 * @param colors - Ordered list of hex colors (e.g. ["#ff0000", "#00ff00", "#0000ff"]).
 *                 Must contain at least 2 colors.
 * @param steps - Number of colors to generate (>= 2). Includes the first and last.
 * @returns An array of hex color strings representing the full multi-stop gradient.
 *
 * @example
 * ```ts
 * interpolateColors(["#ff0000", "#00ff00", "#0000ff"], 7)
 * // → ['#ff0000', '#aa5500', '#55aa00', '#00ff00', '#0055aa', '#0000aa', '#0000ff']
 * ```
 */
export function interpolateColors(colors: string[], steps: number): string[] {
	if (!Array.isArray(colors) || colors.length < 2) {
		throw new Error('interpolateColors: provide at least two colors')
	}
	if (steps < 2) {
		throw new Error('interpolateColors: steps must be >= 2')
	}

	const rgbStops = colors.map(hexToRgb)
	const segmentCount = rgbStops.length - 1

	const result: string[] = []
	for (let i = 0; i < steps; i++) {
		const tGlobal = i / (steps - 1) // 0 → 1 across entire gradient
		// Map global t to segment index and local t within that segment
		let segmentIndex = Math.floor(tGlobal * segmentCount)
		if (segmentIndex >= segmentCount) segmentIndex = segmentCount - 1
		const segmentStartT = segmentIndex / segmentCount
		const segmentEndT = (segmentIndex + 1) / segmentCount
		const tLocal = (tGlobal - segmentStartT) / (segmentEndT - segmentStartT)

		const [r1, g1, b1] = rgbStops[segmentIndex]
		const [r2, g2, b2] = rgbStops[segmentIndex + 1]

		const r = Math.round(r1 + (r2 - r1) * tLocal)
		const g = Math.round(g1 + (g2 - g1) * tLocal)
		const b = Math.round(b1 + (b2 - b1) * tLocal)
		result.push(rgbToHex(r, g, b))
	}

	return result
}

/**
 * Creates a color rotator function that cycles through an array of colors
 * @param colors - Array of hex color strings
 * @returns Function that returns the next color in the sequence
 */
export function colorRotator(colors: string[] = ['#f00', '#0f0', '#00f']) {
	let currentIndex = 0

	return () => {
		const color = colors[currentIndex]
		currentIndex = (currentIndex + 1) % colors.length
		return color
	}
}
