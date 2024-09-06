'use client'

import { useMotionValueEvent, useScroll } from 'framer-motion'
import { RefObject, useState } from 'react'

export function useBannerScrollProgress(
	animRef: RefObject<HTMLElement>
): number {
	const [progress, setProgress] = useState<number>(0)

	const { scrollYProgress } = useScroll({
		target: animRef,
		axis: 'y',
		offset: ['-550px', '-50px'],
	})
	// useMotionValueEvent(scrollYProgress, 'change', latest => {
	// 	// console.log(`${projectName}: `, latest)
	// 	setProgress(latest)
	// })

	return progress
}
