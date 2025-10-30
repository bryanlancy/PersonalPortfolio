/**
 * Console easter egg - text normalization and padding helpers.
 *
 * Utilities here shape raw multi-line strings into arrays of lines that are
 * visually consistent when styled in the console: removing accidental blank
 * rows and ensuring all lines share a uniform width by padding with spaces.
 */

/**
 * Pads every line to the length of the longest line, creating a uniformly
 * rectangular block when rendered with a monospace font and white-space: pre.
 */
/**
 * Pad each line to match the maximum line length in the provided list.
 *
 * Use a monospace font and `white-space: pre` for best visual alignment.
 *
 * @param lines Lines to pad (unchanged if array is empty)
 * @param padChar Character used to pad on the right (default: space)
 * @returns New array with all lines padded to the same width
 */
export function padLinesToUniformWidth(
	lines: string[],
	padChar: string = ' '
): string[] {
	if (lines.length === 0) return lines
	const maxLen = lines.reduce((m, l) => Math.max(m, l.length), 0)
	return lines.map(l =>
		l.length < maxLen ? l + padChar.repeat(maxLen - l.length) : l
	)
}

/**
 * Fixed target width for console blocks. Tune as desired to fit content.
 */
export const DEFAULT_BLOCK_WIDTH = 80

/**
 * Pad each line to an exact target width. Optionally center the content by
 * distributing padding evenly on both sides (left-biased by one when odd).
 *
 * @param lines Lines to pad
 * @param width Target width in characters
 * @param center If true, pad on both sides to keep content centered
 * @param padChar Padding character (default space)
 */
export function padLinesToWidth(
	lines: string[],
	width: number,
	center: boolean = false,
	padChar: string = ' '
): string[] {
	return lines.map(l => {
		const len = l.length
		if (len >= width) return l
		const totalPad = width - len
		if (!center) return l + padChar.repeat(totalPad)
		const left = Math.floor(totalPad / 2)
		const right = totalPad - left
		return padChar.repeat(left) + l + padChar.repeat(right)
	})
}

/**
 * Normalizes an array of lines by trimming trailing spaces, removing
 * leading/trailing empty lines, and collapsing consecutive empty lines
 * into a single empty line. This prevents stray blank background rows.
 */
/**
 * Normalize a list of lines to avoid rendering stray empty background rows.
 *
 * Steps:
 * - Trim trailing whitespace from each line
 * - Remove leading and trailing empty lines
 * - Collapse sequences of empty lines into a single empty line
 *
 * @param lines Lines to normalize
 * @returns Normalized lines
 */
export function normalizeLines(lines: string[]): string[] {
	if (lines.length === 0) return lines
	// Trim right spaces so empty detection is reliable
	const trimmedRight = lines.map(l => l.replace(/\s+$/g, ''))
	// Remove leading empties
	let start = 0
	while (start < trimmedRight.length && trimmedRight[start] === '') start++
	// Remove trailing empties
	let end = trimmedRight.length - 1
	while (end >= start && trimmedRight[end] === '') end--
	const sliced = trimmedRight.slice(start, end + 1)
	// Collapse consecutive empties
	const result: string[] = []
	let lastEmpty = false
	for (const line of sliced) {
		const isEmpty = line === ''
		if (isEmpty) {
			if (!lastEmpty) result.push('')
		} else {
			result.push(line)
		}
		lastEmpty = isEmpty
	}
	return result
}
