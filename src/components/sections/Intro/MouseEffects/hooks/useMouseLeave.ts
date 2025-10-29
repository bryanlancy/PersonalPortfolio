import { useEffect } from 'react'

/**
 * Custom hook for handling mouse leave events
 * @param svgRef - Reference to the SVG element
 * @param onMouseLeave - Callback function to execute when mouse leaves
 * @param dependencies - Dependencies array for the effect
 */
export const useMouseLeave = (
	svgRef: React.RefObject<SVGSVGElement>,
	onMouseLeave: () => void,
	dependencies: React.DependencyList = []
) => {
	useEffect(() => {
		const svg = svgRef.current
		if (!svg) return

		const handleMouseLeave = () => {
			onMouseLeave()
		}

		svg.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			svg.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, dependencies)
}
