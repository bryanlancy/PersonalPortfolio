import { FC, PropsWithChildren, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'

import styles from './FancyText.module.scss'
import { cn } from '../react'

interface FancyTextProps extends PropsWithChildren {
	/** Controls start of animation */
	shouldAnimate?: boolean
	/** Should animation reverse direction when `shouldAnimate` changes? Defaults to `true` */
	reverse?: boolean
	className?: string
}

const FancyText: FC<FancyTextProps> = ({
	shouldAnimate = true,
	reverse = true,
	className,
	children,
}) => {
	gsap.registerPlugin(useGSAP)
	gsap.registerPlugin(SplitText)

	const containerRef = useRef<HTMLDivElement>(null)
	const tl = useRef(gsap.timeline({ paused: true }))

	const { contextSafe } = useGSAP({
		scope: containerRef,
		dependencies: [shouldAnimate],
	})

	const animateText = contextSafe(() => {
		let split = SplitText.create(`.${styles.text}`, {
			type: 'chars',
			deepSlice: true,
			autoSplit: true,
		})

		tl.current.from(split.chars, {
			y: 32,
			autoAlpha: 0,
			stagger: 0.025,
			duration: 0.1,
		})
	})
	useGSAP(() => {
		animateText()
	}, [])
	useGSAP(() => {
		if (shouldAnimate) {
			tl.current.resume()
		}
		if (tl.current && reverse) {
			tl.current.reversed(!shouldAnimate)
		}
	}, [shouldAnimate, reverse])

	return (
		<div ref={containerRef} className={className}>
			<p className={cn(styles.text, '.text')}>{children}</p>
		</div>
	)
}

export default FancyText
