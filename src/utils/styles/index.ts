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
 * Generate an array of evenly spaced colors between two hex values.
 *
 * @param start - The starting hex color (e.g. "#ff0000").
 * @param end - The ending hex color (e.g. "#0000ff").
 * @param steps - Number of colors to generate (must be >= 2).
 *                Includes both start and end colors.
 * @returns An array of hex color strings representing the gradient.
 *
 * @example
 * ```ts
 * interpolateColors("#ff0000", "#0000ff", 5);
 * // → ['#ff0000', '#bf003f', '#800080', '#4000bf', '#0000ff']
 * ```
 */
export function interpolateColors(
	start: string,
	end: string,
	steps: number
): string[] {
	const [r1, g1, b1] = hexToRgb(start)
	const [r2, g2, b2] = hexToRgb(end)

	const colors: string[] = []

	for (let i = 0; i < steps; i++) {
		const t = i / (steps - 1) // value from 0 → 1
		const r = Math.round(r1 + (r2 - r1) * t)
		const g = Math.round(g1 + (g2 - g1) * t)
		const b = Math.round(b1 + (b2 - b1) * t)
		colors.push(rgbToHex(r, g, b))
	}

	return colors
}
