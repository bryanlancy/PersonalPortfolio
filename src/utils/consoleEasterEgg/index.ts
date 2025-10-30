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
	printErrorAndTechOverview(techSections)
}
