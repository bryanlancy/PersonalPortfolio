import { FC, PropsWithChildren, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'

import styles from './FancyText.module.scss'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(SplitText)

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
	const containerRef = useRef<HTMLDivElement>(null)
	const tl = useRef(gsap.timeline({ paused: true }))

	const { contextSafe } = useGSAP({
		scope: containerRef,
		dependencies: [shouldAnimate],
	})

	const animateText = contextSafe(() => {
		let split = SplitText.create(`.${styles.text}`, {
			type: 'chars, words',
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
		if (reverse) {
			tl.current.reversed(!shouldAnimate)
		}
	}, [shouldAnimate, reverse])

	const content =
		typeof children === 'string' ? (
			<p className={styles.text}>{children}</p>
		) : (
			children
		)

	return (
		<div ref={containerRef} className={className}>
			{content}
		</div>
	)
}

export default FancyText
