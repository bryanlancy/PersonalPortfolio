import { Coord, randomInteger } from '../general'

export function printPoint(point: Coord): string {
	return `${point.x} ${point.y}`
}

export function generatePoints(
	width: number | [number, number],
	height: number | [number, number],
	numPoints: number,
	type: string = 'random'
): Coord[] {
	const coords: Coord[] = []

	switch (type) {
		case 'toit':
			for (let i = 0; i < numPoints; i++) {
				const xRange: [number, number] = [0, 0]
				const yRange: [number, number] = [0, 0]

				if (Array.isArray(width)) {
					xRange[0] = width[0]
					xRange[1] = width[1]
				} else {
					xRange[1] = width
				}
				if (Array.isArray(height)) {
					yRange[0] = height[0]
					yRange[1] = height[1]
				} else {
					yRange[1] = height
				}

				const yDist = Math.abs(yRange[1] - yRange[0])
				const yMid = (yRange[0] + yRange[1]) / 2

				const point: Coord = {
					x: randomInteger(...xRange),
					y: randomInteger(yMid - yDist * 0.2, yMid + yDist * 0.2),
				}

				coords.push(point)
			}
			break

		case 'random':
		default:
			for (let i = 0; i < numPoints; i++) {
				const xRange: [number, number] = [0, 0]
				const yRange: [number, number] = [0, 0]

				if (Array.isArray(width)) {
					xRange[0] = width[0]
					xRange[1] = width[1]
				} else {
					xRange[1] = width
				}
				if (Array.isArray(height)) {
					yRange[0] = height[0]
					yRange[1] = height[1]
				} else {
					yRange[1] = height
				}

				const point: Coord = {
					x: randomInteger(...xRange),
					y: randomInteger(...yRange),
				}

				coords.push(point)
			}

			break
	}

	return coords
}

export function lineOfBestFit(
	points: Coord[],
	viewBox: [number, number, number, number]
): string {
	const n = points.length

	if (n === 0) throw new Error('No points provided')

	let sumX = 0,
		sumY = 0,
		sumXY = 0,
		sumX2 = 0

	for (const { x, y } of points) {
		sumX += x
		sumY += y
		sumXY += x * y
		sumX2 += x * x
	}

	const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
	const intercept = (sumY - slope * sumX) / n

	return generateLineFromPoints(points, viewBox[3], slope, intercept)
}

function getMinMaxValues(coords: Coord[]): {
	min: { x: number; y: number }
	max: { x: number; y: number }
} {
	let minX = Infinity
	let minY = Infinity
	let maxX = 0
	let maxY = 0

	for (let i = 0; i < coords.length; i++) {
		const { x, y } = coords[i]

		if (x < minX) minX = x
		if (x > maxX) maxX = x
		if (y < minY) minY = y
		if (y > maxY) maxY = y
	}

	return {
		min: { x: minX, y: minY },
		max: { x: maxX, y: maxY },
	}
}

function generateLineFromPoints(
	points: Coord[],
	height: number,
	slope: number,
	intercept: number
): string {
	const {
		min: { x: xMin },
		max: { x: xMax },
	} = getMinMaxValues(points)

	const bestLineStart: Coord = {
		x: xMin * 0.9,
		y: height - (xMin * 0.9 * slope + intercept),
	}
	const bestLineEnd: Coord = {
		x: xMax * 1.1,
		y: height - (xMax * 1.1 * slope + intercept),
	}

	return `M ${printPoint(bestLineStart)} L ${printPoint(bestLineEnd)}`
}

export function generateSpiralPath({
	width,
	height,
	type,
	turns,
	pointsPerTurn,
	startRadius,
	endRadius,
}: {
	width: number
	height: number
	type: 'rectangular' | 'circular' | 'hexagonal'
	turns: number
	pointsPerTurn: number
	startRadius: number
	endRadius: number
}): string {
	const centerX = width / 2
	const centerY = height / 2
	const maxRadius = Math.min(width, height) / 2
	const totalPoints = turns * pointsPerTurn
	const pathPoints: string[] = []

	for (let i = 0; i <= totalPoints; i++) {
		const progress = i / totalPoints
		const radius = startRadius + (endRadius - startRadius) * progress
		const angle = (i / pointsPerTurn) * 2 * Math.PI

		let x: number, y: number

		switch (type) {
			case 'rectangular':
				x = centerX + Math.cos(angle) * radius * maxRadius
				y = centerY + Math.sin(angle) * radius * maxRadius
				break
			case 'circular':
				x = centerX + Math.cos(angle) * radius * maxRadius
				y = centerY + Math.sin(angle) * radius * maxRadius
				break
			case 'hexagonal':
				const hexAngle =
					Math.floor(angle / (Math.PI / 3)) * (Math.PI / 3)
				x = centerX + Math.cos(hexAngle) * radius * maxRadius
				y = centerY + Math.sin(hexAngle) * radius * maxRadius
				break
			default:
				x = centerX + Math.cos(angle) * radius * maxRadius
				y = centerY + Math.sin(angle) * radius * maxRadius
		}

		if (i === 0) {
			pathPoints.push(`M ${x} ${y}`)
		} else {
			pathPoints.push(`L ${x} ${y}`)
		}
	}

	return pathPoints.join(' ')
}

/**
 * Generates an SVG path string for a perfect circle using cubic Bézier curves.
 *
 * This function creates a mathematically precise circle by approximating it with four
 * cubic Bézier curve segments. Each segment represents a quarter of the circle.
 *
 * @param centerX - The x-coordinate of the circle's center point
 * @param centerY - The y-coordinate of the circle's center point
 * @param radius - The radius of the circle (must be positive)
 * @returns A string containing the complete SVG path data for the circle
 *
 * @example
 * ```typescript
 * // Create a circle with center at (100, 100) and radius of 50
 * const circlePath = generateCircularPath(100, 100, 50);
 *
 * // Use in SVG element
 * <svg>
 *   <path d={circlePath} fill="blue" stroke="black" strokeWidth="2" />
 * </svg>
 * ```
 *
 * @example
 * ```typescript
 * // Create multiple circles for a pattern
 * const circles = [
 *   generateCircularPath(50, 50, 25),   // Small circle
 *   generateCircularPath(150, 150, 75), // Large circle
 *   generateCircularPath(250, 100, 40)  // Medium circle
 * ];
 * ```
 *
 * @throws {Error} When radius is negative or zero
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#curve_commands} SVG Path Curve Commands
 */
export function generateCircularPath(
	centerX: number,
	centerY: number,
	radius: number
): string {
	// Validate input parameters
	if (radius <= 0) {
		throw new Error('Radius must be a positive number')
	}

	// Calculate the control points for a smooth circle using cubic Bézier curves
	// The magic number 0.5522847498 is derived from the mathematical formula:
	// 4 * (sqrt(2) - 1) / 3, which ensures perfect circle approximation
	const controlPointOffset = radius * 0.5522847498

	const path = `M ${centerX - radius} ${centerY} C ${centerX - radius} ${
		centerY - controlPointOffset
	}, ${centerX - controlPointOffset} ${centerY - radius}, ${centerX} ${
		centerY - radius
	} C ${centerX + controlPointOffset} ${centerY - radius}, ${
		centerX + radius
	} ${centerY - controlPointOffset}, ${centerX + radius} ${centerY} C ${
		centerX + radius
	} ${centerY + controlPointOffset}, ${centerX + controlPointOffset} ${
		centerY + radius
	}, ${centerX} ${centerY + radius} C ${centerX - controlPointOffset} ${
		centerY + radius
	}, ${centerX - radius} ${centerY + controlPointOffset}, ${
		centerX - radius
	} ${centerY} Z`

	return path
}
