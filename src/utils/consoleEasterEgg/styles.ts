/**
 * Console easter egg - shared styles and render helpers.
 *
 * This module centralizes color definitions and low-level console rendering utilities
 * used by the console easter egg. Rendering is performed using console `%c` style
 * segments, output per line, to achieve consistent backgrounds with rounded corners
 * on only the first and last lines.
 */

/**
 * Shared color palette for console rendering.
 */
export const styles = {
	sectionBg: '#0b1220',
	sectionFg: '#e2e8f0',
	asciiBg: '#03141a',
	asciiFg: '#22d3ee',
	gold: '#eab308',
	pink: '#ec4899',
}

/**
 * Build a CSS style string for one line of console output.
 *
 * Notes:
 * - Uses `display:inline-block` with `white-space:pre` so padding and background
 *   apply tightly to the text while preserving spaces.
 * - Border radius is controlled per-line to render only on top and bottom rows.
 *
 * @param params.bg Background color for the line
 * @param params.fg Foreground (text) color for the line
 * @param params.radius Border radius to apply to the line (e.g. "6px 6px 0 0")
 * @returns A style string suitable for console `%c` segments
 */
export function buildLineStyle({
	bg,
	fg,
	radius,
}: {
	bg: string
	fg: string
	radius: string
}): string {
	return [
		`color:${fg}`,
		`background:${bg}`,
		'line-height:1.2',
		`border-radius:${radius}`,
		'white-space:pre',
		'display:inline-block',
		'padding:4px 12px',
	].join(';')
}

/**
 * Options for rendering a multi-line block into the console.
 */
export type LogBlockOptions = {
	bg: string
	fg: string
	perLineFg?: (line: string, index: number) => string | undefined
	perLineStyle?: (line: string, index: number) => string | undefined
	perLineSegments?: (
		line: string,
		index: number
	) => Array<{ text: string; fg?: string; extra?: string }> | undefined
}

/**
 * Render a multi-line console block using `%c` styled segments per line.
 *
 * Behavior:
 * - Each line is emitted as a styled `%c` segment, followed by an unstyled `%c\n`
 *   separator for all but the last line. This avoids styling the newline itself,
 *   preventing stray background rows before/after lines.
 * - The first and last lines receive rounded corners; middle lines have square corners.
 * - Optional per-line overrides allow changing foreground color or adding
 *   additional styles (e.g., underline) based on content or index.
 *
 * @param lines Array of lines to render (already normalized and padded)
 * @param options Global and per-line styling options
 */
export function logBlock(lines: string[], options: LogBlockOptions): void {
	if (lines.length === 0) return
	const fmtParts: string[] = []
	const styleParts: string[] = []

	lines.forEach((line, index) => {
		const isFirst = index === 0
		const isLast = index === lines.length - 1
		const radius =
			isFirst && isLast
				? '6px'
				: isFirst
				? '6px 6px 0 0'
				: isLast
				? '0 0 6px 6px'
				: '0'

		const segments = options.perLineSegments?.(line, index)
		if (segments && segments.length > 0) {
			segments.forEach((seg, segIdx) => {
				const segIsFirst = segIdx === 0
				const segIsLast = segIdx === segments.length - 1
				const segRadius =
					segIsFirst && segIsLast
						? radius
						: segIsFirst
						? isFirst
							? '6px 0 0 0'
							: '0'
						: segIsLast
						? isLast
							? '0 0 6px 0'
							: '0'
						: '0'
				const segFg =
					seg.fg ?? options.perLineFg?.(line, index) ?? options.fg
				const segExtra =
					seg.extra ?? options.perLineStyle?.(line, index)
				// Remove horizontal padding between inline segments to avoid visual gaps
				const segPadFix = segIsFirst
					? 'padding-right:0'
					: segIsLast
					? 'padding-left:0'
					: 'padding-left:0;padding-right:0'

				fmtParts.push('%c' + seg.text)
				styleParts.push(
					buildLineStyle({
						bg: options.bg,
						fg: segFg,
						radius: segRadius,
					}) +
						(segExtra ? `;${segExtra}` : '') +
						`;${segPadFix}`
				)
			})
		} else {
			const fg = options.perLineFg?.(line, index) ?? options.fg
			const extra = options.perLineStyle?.(line, index)
			// Styled content for this line
			fmtParts.push('%c' + line)
			styleParts.push(
				buildLineStyle({ bg: options.bg, fg, radius }) +
					(extra ? `;${extra}` : '')
			)
		}

		// Unstyled newline after each line except the last to avoid styling the break itself
		if (!isLast) {
			fmtParts.push('%c\n')
			styleParts.push('')
		}
	})

	// eslint-disable-next-line no-console
	console.log(fmtParts.join(''), ...styleParts)
}
