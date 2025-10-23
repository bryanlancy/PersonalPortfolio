export type Coord = { x: number; y: number }

export interface NumberRange {
	min: number
	max: number
}

/**
 *
 * @param num value to be mapped to new ranger
 * @param inRange input [min, max]
 * @param outRange output [min, max]
 * @param clamp clamp output to `outMax` and `outMin`, defaults to true
 * @returns
 */
export function mapRange(
	num: number,
	inRange: [number, number],
	outRange: [number, number],
	clamp = true
) {
	if (typeof num !== 'number') return 0

	const [inMin, inMax] = inRange
	const [outMin, outMax] = outRange

	// Map input to output range
	let mappedValue =
		((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin

	if (clamp) {
		// Clamp new value to max value
		mappedValue = Math.min(mappedValue, outMax)
		// Clamp new value to min value
		mappedValue = Math.max(mappedValue, outMin)
	}

	// Return new value
	return mappedValue
}

/**
 * Generates a random integer in the provided range. Both min and max are possible results.
 * @param min Minimum number to return
 * @param max Maximum number to return
 * @returns {number} Random integer within range
 */
export function randomInteger(min: number, max: number) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export function arrRotator<T>(arr: T[]): () => T {
	let currI = 0

	return () => {
		const currValue = arr[currI++]
		if (currI > arr.length - 1) currI = 0
		return currValue
	}
}

/**
 * Prevents scrolling on the body element by setting overflow: hidden
 * and storing the current scroll position
 */
export function preventScroll(): void {
	if (typeof window === 'undefined') return

	const scrollY = window.scrollY
	document.body.style.position = 'fixed'
	document.body.style.top = `-${scrollY}px`
	document.body.style.width = '100%'
	document.body.style.overflow = 'hidden'
}

/**
 * Re-enables scrolling on the body element and restores scroll position
 */
export function enableScroll(): void {
	if (typeof window === 'undefined') return

	const scrollY = document.body.style.top
	document.body.style.position = ''
	document.body.style.top = ''
	document.body.style.width = ''
	document.body.style.overflow = ''

	if (scrollY) {
		window.scrollTo(0, parseInt(scrollY || '0') * -1)
	}
}

/**
 * Calculates how many times a text string should be repeated to fill a circular path
 * @param text The text string to repeat (e.g., "GO!")
 * @param charWidth The estimated width of each character in the text
 * @param radius The radius of the circular path
 * @returns The repeated text that will fill the circumference
 */
export function calculateTextRepetitions(
	text: string,
	charWidth: number,
	radius: number
): string {
	// Calculate circumference of circle
	const circumference = 2 * Math.PI * radius

	// Calculate total width of the text string
	const textWidth = text.length * charWidth

	// Calculate how many times the text fits in the circumference
	const repetitions = Math.floor(circumference / textWidth)

	// Generate the repeated text with spaces between repetitions
	return `${text} `.repeat(repetitions).trim()
}
