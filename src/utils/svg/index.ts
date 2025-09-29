import { view } from 'motion/react-client'
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

				console.log(yRange)
				console.log(yDist)
				console.log(yMid)

				const point: Coord = {
					x: randomInteger(...xRange),
					y: randomInteger(yMid - 100, yMid + 100),
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
	viewBox: [number, number, number, number],
	numPoints: number = 10
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
	console.log(bestLineStart)
	console.log(bestLineEnd)

	return `M ${printPoint(bestLineStart)} L ${printPoint(bestLineEnd)}`
}
