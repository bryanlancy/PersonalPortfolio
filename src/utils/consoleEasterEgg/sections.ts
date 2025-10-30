/**
 * Console easter egg - section printers.
 *
 * High-level rendering functions that assemble content and delegate styled output
 * to the shared renderer. Each function builds its lines, normalizes spacing,
 * pads to uniform width, and prints with consistent backgrounds.
 */

import { getAsciiArt, getHelloArt, TechSection } from './text'
import {
	normalizeLines,
	padLinesToUniformWidth,
	padLinesToWidth,
	DEFAULT_BLOCK_WIDTH,
} from './format'
import { logBlock, styles } from './styles'

/**
 * Print the ASCII welcome block.
 */
export function printAsciiArt(targetWidth?: number): void {
	const lines = getAsciiArt().split('\n')
	const normalized = normalizeLines(lines)
	const uniform = padLinesToUniformWidth(normalized)
	const width = targetWidth ?? DEFAULT_BLOCK_WIDTH
	const padded = padLinesToWidth(uniform, width, true)
	logBlock(padded, {
		bg: styles.asciiBg,
		fg: styles.asciiFg,
		perLineStyle: () => 'line-height:0.9',
	})
}

/**
 * Print a random "Hello!" ASCII greeting block.
 */
export function printHello(targetWidth?: number): void {
	const lines = getHelloArt().split('\n')
	const normalized = normalizeLines(lines)
	const uniform = padLinesToUniformWidth(normalized)
	const width = targetWidth ?? DEFAULT_BLOCK_WIDTH
	const padded = padLinesToWidth(uniform, width, true)
	logBlock(padded, {
		bg: styles.asciiBg,
		fg: styles.asciiFg,
		perLineStyle: () => 'line-height:.9',
	})
}

/**
 * Print the helpful error note for curious DevTools users.
 */
export function printErrorNote(): void {
	const lines = [
		'Saw an error and popped open DevTools?',
		"If you spotted a bug, a broken animation, or something that looks off, I'd love to know!",
		'Please reach out at bryanburns93@gmail.com — steps to reproduce and screenshots help a ton!',
	]
	const normalized = normalizeLines(lines)
	const padded = padLinesToUniformWidth(normalized)
	logBlock(padded, {
		bg: styles.sectionBg,
		fg: styles.sectionFg,
		perLineFg: (_line, idx) => (idx === 0 ? styles.gold : undefined),
		perLineStyle: () => 'line-height:.9',
		perLineSegments: line => {
			const email = 'bryanburns93@gmail.com'
			const idx = line.indexOf(email)
			if (idx === -1) return undefined
			const before = line.slice(0, idx)
			const after = line.slice(idx + email.length)
			return [
				{ text: before },
				{ text: email, fg: '#10b981' }, // green highlight
				{ text: after },
			]
		},
	})
}

/**
 * Print the technology overview with titled sections and bullet items.
 *
 * Styling:
 * - First line is gold
 * - Section titles are pink and underlined
 * - Items are neutral section text color
 *
 * @param sections Structured technology sections to display
 */
export function printTechOverview(sections: TechSection[]): void {
	const lines: string[] = []
	const titleIndexes = new Set<number>()
	lines.push('Curious about the tech behind this site?')
	sections.forEach(section => {
		lines.push(section.title)
		titleIndexes.add(lines.length - 1)
		section.items.forEach(item => lines.push('  - ' + item))
	})
	const normalized = normalizeLines(lines)
	const padded = padLinesToUniformWidth(normalized)
	logBlock(padded, {
		bg: styles.sectionBg,
		fg: styles.sectionFg,
		perLineFg: (_line, idx) => {
			if (idx === 0) return styles.gold
			if (titleIndexes.has(idx)) return styles.pink
			return undefined
		},
		perLineStyle: (_line, idx) =>
			'line-height:.9 ' +
			(titleIndexes.has(idx) ? 'text-decoration: underline' : undefined),
		// slight line-height adjustment for readability on dense lists
		// appended via per-line segments is not needed here, we apply globally
		// through a default when underline isn't applied
		// Note: combine with underline by returning both when needed
	})
}

/**
 * Print a single combined block containing the error note and the technology overview.
 *
 * Styling:
 * - First line gold
 * - Section titles pink + underline
 * - Email highlighted green inline
 * - Slightly tighter line-height for compactness
 */
export function printErrorAndTechOverview(
	sections: TechSection[],
	targetWidth?: number
): void {
	const lines: string[] = []
	const titleIndexes = new Set<number>()

	// Error note
	const errorLines = [
		'Saw an error and popped open DevTools?',
		"If you spotted a bug, a broken animation, or something that looks off, I'd love to know!",
		'Please reach out at bryanburns93@gmail.com — steps to reproduce and screenshots help a ton!',
	]
	lines.push(...errorLines)

	// Spacer then tech header
	lines.push('')
	const techHeader = 'Curious about the tech behind this site?'
	const headerIndex = lines.length
	lines.push(techHeader)

	// Tech sections
	sections.forEach(section => {
		lines.push(section.title)
		titleIndexes.add(lines.length - 1)
		section.items.forEach(item => lines.push('  - ' + item))
	})

	const normalized = normalizeLines(lines)
	const uniform = padLinesToUniformWidth(normalized)
	const width = targetWidth ?? DEFAULT_BLOCK_WIDTH
	const padded = padLinesToWidth(uniform, width)
	logBlock(padded, {
		bg: styles.sectionBg,
		fg: styles.sectionFg,
		perLineFg: (_line, idx) => {
			if (idx === 0) return styles.gold
			if (idx === headerIndex) return styles.gold
			if (titleIndexes.has(idx)) return styles.pink
			return undefined
		},
		perLineStyle: (_line, idx) =>
			titleIndexes.has(idx)
				? 'line-height:.9;text-decoration: underline'
				: 'line-height:.9',
		perLineSegments: line => {
			const email = 'bryanburns93@gmail.com'
			const i = line.indexOf(email)
			if (i === -1) return undefined
			const before = line.slice(0, i)
			const after = line.slice(i + email.length)
			return [
				{ text: before },
				{ text: email, fg: '#10b981' },
				{ text: after },
			]
		},
	})
}
