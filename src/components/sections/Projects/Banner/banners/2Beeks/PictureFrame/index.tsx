import { FC, MutableRefObject } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'

import styles from './PictureFrame.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface PictureFrameProps {
	src: string
	alt: string
	// width: number
	// height: number
	className?: string
	ref?: MutableRefObject<HTMLDivElement>
}

const PictureFrame: FC<PictureFrameProps> = ({
	src,
	alt,
	// width,
	// height,
	className,
	ref,
}) => {
	return (
		<div ref={ref} className={cn(styles.container, className)}>
			<Image
				className={styles.image}
				src={src}
				alt={alt}
				fill
				sizes='240px'
			/>
			<div className={styles.frame}></div>
		</div>
	)
}

export default PictureFrame
