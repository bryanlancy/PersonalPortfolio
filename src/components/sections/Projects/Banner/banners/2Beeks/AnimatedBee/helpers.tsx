import { Coord, NumberRange, randomInteger } from '@/utils/general'

function randomPoint(xRange: NumberRange, yRange: NumberRange): Coord {
	return {
		x: randomInteger(xRange.min, xRange.max),
		y: randomInteger(yRange.min, yRange.max),
	}
}

export function generateRandomWalkCurve(
	numPoints: number,
	xRange: NumberRange,
	yRange: NumberRange
): Coord[] {
	const points = []
	let currentX = (Math.random() * (xRange.max - xRange.min)) / numPoints
	let currentY = yRange.min + Math.random() * (yRange.max - yRange.min)

	for (let i = 1; i < numPoints; i++) {
		// Small random step in X
		currentX += (Math.random() * (xRange.max - xRange.min)) / numPoints
		// Small random step in Y
		currentY +=
			((Math.random() - 0.5) * (yRange.max - yRange.min)) / numPoints

		// Clamp coordinates within the defined range if desired
		currentX = Math.max(xRange.min, Math.min(xRange.max, currentX))
		// currentY = Math.max(yRange.min, Math.min(yRange.max, currentY))

		points.push({ x: currentX, y: currentY })
	}
	return points
}
type LineTypes = 'straight' | 'curve'
export function getSVGPathData(
	numPoints: number,
	xRange: NumberRange,
	yRange: NumberRange,
	type: LineTypes = 'straight'
): string {
	const points = generateRandomWalkCurve(numPoints - 1, xRange, yRange)

	const startingPoint = `M ${-40} ${randomInteger(0, yRange.max)} `
	let finalPoint = ''
	let pathString = ''

	switch (type) {
		case 'straight':
			for (let i = 0; i < points.length; i++) {
				const point = points[i]
				pathString += `L ${point.x} ${point.y} `
			}
			finalPoint = `L ${xRange.max + 120} ${randomInteger(0, yRange.max)}`
			break
		case 'curve':
			for (let i = 0; i < points.length; i++) {
				const curveRange = 20
				const point = points[i]
				const curveX = randomInteger(
					point.x - curveRange,
					point.x + curveRange
				)
				const curveY = randomInteger(
					point.y - curveRange,
					point.y + curveRange
				)

				pathString += `S ${curveX} ${curveY} ${point.x} ${point.y} `
			}
			const finalCurve = randomPoint(xRange, yRange)
			finalPoint = `S ${finalCurve.x} ${finalCurve.y} ${
				xRange.max + 80
			} ${randomInteger(0, yRange.max)}`
			break
		default:
			break
	}

	return startingPoint + pathString + finalPoint
}

//! ===================== old
// function getDistance(pointA: Coord, pointB: Coord) {
// 	return Math.sqrt((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2)
// }

// function getAngle(...points: Coord[]) {
// 	const [pointA, pointB, pointC] = points
// 	// angle to pointB
// 	let a = getDistance(pointA, pointB)
// 	let b = getDistance(pointB, pointC)
// 	let c = getDistance(pointC, pointA)
// 	return Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / Math.PI)
// }
// function getPoint(width: number, height: number, random = true) {
// 	const minDistance = height / 6
// 	const maxDistance = height
// 	const lastTwoPoints: Coord[] = []

// 	let x = random ? randomInteger(0, width * 0.6) + width * 0.2 : width
// 	let y = random ? randomInteger(0, height * 0.8) + height * 0.4 : height

// 	let point: Coord = { x, y }
// 	if (lastTwoPoints.length < 2) {
// 		lastTwoPoints.push(point)
// 	} else {
// 		if (
// 			getAngle(...lastTwoPoints, point) > 20 ||
// 			getDistance(lastTwoPoints[1], point) < minDistance ||
// 			getDistance(lastTwoPoints[1], point) > maxDistance
// 		) {
// 			point = getPoint(width, height)
// 		} else {
// 			lastTwoPoints.shift()
// 			lastTwoPoints.push(point)
// 		}
// 	}
// 	return point
// }

// function pointString(width: number, height: number, random = true) {
// 	let point = getPoint(width, height, random)
// 	return `${point.x} ${point.y} `
// }

// export function createPath(numPoints: number, w: number, h: number) {
// 	const startPoint = `M ${pointString(0, h / 2, false)} C ${pointString(
// 		w,
// 		h
// 	)} ${pointString(w, h)} ${pointString(w, h)}`

// 	const finalPoint = `C ${pointString(
// 		randomInteger(0, w),
// 		randomInteger(0, h)
// 	)} ${pointString(randomInteger(0, w), randomInteger(0, h))} ${pointString(
// 		w,
// 		h,
// 		false
// 	)} `

// 	let pathString = ''

// 	for (let i = 0; i < numPoints - 2; i++) {
// 		pathString += `S ${pointString(w, h)} ${pointString(w, h)} `
// 	}
// 	return startPoint + pathString + finalPoint
// }
