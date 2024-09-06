import React, {
	Dispatch,
	FC,
	PropsWithChildren,
	RefObject,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
} from 'react'
import { cn } from '@/utils/react'

import styles from './ProjectBanner.module.scss'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { BannerContext, BannerContextProvider } from '@/context/bannerContext'
import { useBannerScrollProgress } from '@/hooks/useBannerScrollProgress'

interface ProjectBannerProps extends PropsWithChildren {
	projectName: string
	className?: string
	animRef: RefObject<HTMLElement>
	setProgressState: Dispatch<SetStateAction<number>>
}

const ProjectBanner: FC<ProjectBannerProps> = ({
	className,
	projectName,
	children,
	animRef,
}) => {
	const progress = useBannerScrollProgress(animRef)
	// const animRef = useRef(null)

	// const { scrollYProgress } = useScroll({
	// 	target: animRef,
	// 	axis: 'y',
	// 	offset: ['-550px', '-50px'],
	// })
	// useMotionValueEvent(scrollYProgress, 'change', latest => {
	// 	console.log(`${projectName}: `, latest)
	// 	if (animState) {
	// 		animState[1](latest)
	// 	} else {
	// 		console.log('Not set up')
	// 	}
	// })

	return (
		<section className={cn(styles.project, className)} ref={animRef}>
			{children}
		</section>
	)
}

export default ProjectBanner
