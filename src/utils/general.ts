/**
 *
 * @param num value to be mapped to new ranger
 * @param inMin input minimum, anything lower is mapped to `outMin`
 * @param inMax input maximum, anything higher is mapped to `outMax`
 * @param outMin output minimum
 * @param outMax output maximum
 * @param clamp clamp output to `outMax` and `outMin`, defaults to true
 * @returns
 */
export function mapRange(
	num: number,
	inMin: number,
	inMax: number,
	outMin: number,
	outMax: number,
	clamp = true
) {
	if (typeof num !== 'number') return 0

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
