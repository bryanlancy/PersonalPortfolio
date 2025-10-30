/**
 * Console easter egg - public entrypoint.
 *
 * Exposes a single default function `consoleEasterEgg` that prints a friendly,
 * styled message for users who open the browser DevTools. The output includes:
 *  - An ASCII-art image
 *  - A helpful note for users who opened DevTools due to an error
 *  - A concise overview of the technologies used to build the site
 *
 * Idempotency: The function is safe to call multiple times; it will only print once
 * per page load (guards both module-scoped and `window`-scoped).
 */

import type { TechSection } from './text'
import { getAsciiArt, getHelloArt } from './text'
import { normalizeLines, padLinesToUniformWidth } from './format'
import {
	printAsciiArt,
	printHello,
	printErrorAndTechOverview,
} from './sections'

let hasPrinted = false

/**
 * Print the full DevTools easter egg in the console.
 */
export default function consoleEasterEgg(): void {
	if (hasPrinted) return
	if (typeof window !== 'undefined') {
		if ((window as any).__consoleEasterEggPrinted) return
		;(window as any).__consoleEasterEggPrinted = true
	}
	hasPrinted = true

	const techSections: TechSection[] = [
		{
			title: 'Framework & Language',
			items: [
				'Next.js + TypeScript',
				'SCSS for styling + GSAP for animations.',
			],
		},
		{
			title: 'Tooling & Hosting',
			items: [
				'ESNext build tooling via Next.js',
				'Netlify deployment with CI/CD pipeline',
			],
		},
	]

	printAsciiArt()
	printHello()
	// Compute a unified target width across all blocks
	const asciiUniform = padLinesToUniformWidth(
		normalizeLines(getAsciiArt().split('\n'))
	)
	const helloUniform = padLinesToUniformWidth(
		normalizeLines(getHelloArt().split('\n'))
	)
	const errorTechUniform = (() => {
		const lines: string[] = []
		const errorLines = [
			'Saw an error and popped open DevTools?',
			"If you spotted a bug, a broken animation, or something that looks off, I'd love to know!",
			'Please reach out at bryanburns93@gmail.com — steps to reproduce and screenshots help a ton!',
		]
		lines.push(...errorLines)
		lines.push('')
		lines.push('Curious about the tech behind this site?')
		techSections.forEach(section => {
			lines.push(section.title)
			section.items.forEach(item => lines.push('  - ' + item))
		})
		return padLinesToUniformWidth(normalizeLines(lines))
	})()
	const widths = [
		...asciiUniform.map(l => l.length),
		...helloUniform.map(l => l.length),
		...errorTechUniform.map(l => l.length),
	]
	const targetWidth = widths.reduce((m, n) => (n > m ? n : m), 0)

	printAsciiArt(targetWidth)
	printHello(targetWidth)
	printErrorAndTechOverview(techSections, targetWidth)
}
