import { Point } from './types'

/**
 * Calculates a variable number of points along a circle of variable radius at a given x,y position
 * @param centerX - X coordinate of the circle center
 * @param centerY - Y coordinate of the circle center
 * @param radius - Radius of the circle
 * @param numPoints - Number of points to generate along the circle
 * @param startAngle - Starting angle in radians (default: 0)
 * @returns Array of Point coordinate pairs representing points on the circle
 */
export const calculateCirclePoints = (
	centerX: number,
	centerY: number,
	radius: number,
	numPoints: number,
	startAngle: number = 0
): Point[] => {
	const points: Point[] = []
	const angleStep = (2 * Math.PI) / numPoints

	for (let i = 0; i < numPoints; i++) {
		const angle = startAngle + i * angleStep
		const x = centerX + radius * Math.cos(angle)
		const y = centerY + radius * Math.sin(angle)
		points.push([x, y])
	}

	return points
}

/**
 * Generates a smooth curved path using cubic Bézier curves with tension control
 * @param points - Array of Point coordinate pairs
 * @returns SVG path data string with smooth curves
 */
export const generateCurvedPath = (points: Point[]): string => {
	if (points.length === 0) return ''
	if (points.length === 1) return `M${points[0][0]},${points[0][1]}`
	if (points.length === 2) {
		// For two points, create a smooth curve
		const [x1, y1] = points[0]
		const [x2, y2] = points[1]
		const dx = x2 - x1
		const dy = y2 - y1
		const controlX1 = x1 + dx * 0.3
		const controlY1 = y1 + dy * 0.3
		const controlX2 = x2 - dx * 0.3
		const controlY2 = y2 - dy * 0.3
		return `M${x1},${y1} C${controlX1},${controlY1} ${controlX2},${controlY2} ${x2},${y2}`
	}

	let path = `M${points[0][0]},${points[0][1]}`

	// Calculate control points for smooth cubic Bézier curves
	for (let i = 1; i < points.length; i++) {
		const [x, y] = points[i]
		const [prevX, prevY] = points[i - 1]

		// Calculate tension factor (how tight the curves are)
		const tension = 0.3

		if (i === 1) {
			// First curve: use next point to determine control points
			const [nextX, nextY] = points[i + 1] || points[i]
			const dx1 = (nextX - prevX) * tension
			const dy1 = (nextY - prevY) * tension
			const dx2 = (x - prevX) * tension
			const dy2 = (y - prevY) * tension

			const controlX1 = prevX + dx1
			const controlY1 = prevY + dy1
			const controlX2 = x - dx2
			const controlY2 = y - dy2

			path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${x},${y}`
		} else if (i === points.length - 1) {
			// Last curve: use previous point to determine control points
			const [prevPrevX, prevPrevY] = points[i - 2]
			const dx1 = (prevX - prevPrevX) * tension
			const dy1 = (prevY - prevPrevY) * tension
			const dx2 = (x - prevX) * tension
			const dy2 = (y - prevY) * tension

			const controlX1 = prevX + dx1
			const controlY1 = prevY + dy1
			const controlX2 = x - dx2
			const controlY2 = y - dy2

			path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${x},${y}`
		} else {
			// Middle curves: use both previous and next points for smoothness
			const [prevPrevX, prevPrevY] = points[i - 2]
			const [nextX, nextY] = points[i + 1]

			// Calculate direction vectors
			const dx1 = (prevX - prevPrevX) * tension
			const dy1 = (prevY - prevPrevY) * tension
			const dx2 = (nextX - prevX) * tension
			const dy2 = (nextY - prevY) * tension

			const controlX1 = prevX + dx1
			const controlY1 = prevY + dy1
			const controlX2 = x - dx2
			const controlY2 = y - dy2

			path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${x},${y}`
		}
	}

	return path
}
