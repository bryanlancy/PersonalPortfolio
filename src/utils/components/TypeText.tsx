import { FC, PropsWithChildren, useRef } from 'react'
import { gsap, SteppedEase } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '../react'

import styles from './TypeText.module.scss'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger)

interface TypeTextProps extends PropsWithChildren {
	/** Controls start of animation */
	shouldAnimate?: boolean
	/** Should animation reverse direction when `shouldAnimate` changes? Defaults to `true` */
	reverse?: boolean
	className?: string

	// Type Text Specific Props
	/*TODO
        `text` is only used to count the number of chars in the displayed text
        to simplify the animation process in the event different types of
        nested elemenets are used.
    */
	text: string
	/** Number of seconds to spend typing each character. Defaults to .025 */
	typeSpeed?: number
	delay?: number
	/** Adjust speed of cursor animation by given amount to fix timing errors */
	cursorSpeedAdjust?: number //! Can this be fixed?
	/** Adjust length of cursor (px) animation by given amount to fix timing errors */
	cursorLengthAdjust?: number //! Can this be fixed?
	cursorClassName?: string
	shouldBlink?: boolean
}

// TODO Work with multiple lines
// TODO Fix cursor type distance..build timeline from char width?
// TODO Cursor doesn't appear when timeline is reversed if its been cleared

const TypeText: FC<TypeTextProps> = ({
	children,
	className,
	cursorLengthAdjust = 0,
	cursorSpeedAdjust = 0,
	cursorClassName,
	delay = 0.0,
	reverse = true,

	shouldAnimate = true,
	shouldBlink = false,
	text,
	typeSpeed = 0.025,
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLDivElement>(null)
	const cursorRef = useRef<HTMLDivElement>(null)

	const textTl = useRef(gsap.timeline({ paused: true }))
	const cursorTl = useRef(gsap.timeline({ paused: true }))

	const { contextSafe } = useGSAP({
		scope: containerRef,
		dependencies: [shouldAnimate],
	})

	const animateText = contextSafe(() => {
		const textWidth = textRef.current?.getBoundingClientRect().width

		// Cursor blinking animation
		gsap.to(`.${styles.cursor}`, {
			// autoAlpha: 1,
			opacity: 1,
			repeat: -1,
			yoyo: true,
			ease: SteppedEase.config(1),
		})
		// Cursor typing animation
		const splitText = SplitText.create(textRef.current, {
			type: 'chars',
			deepSlice: true,
			autoSplit: true,
			onSplit: ({ chars }) => {
				let maxWidth = 0
				const charHeight = chars[0].getBoundingClientRect().height
				chars.forEach(char => {
					const charWidth = char.getBoundingClientRect().width
					if (charWidth > maxWidth) {
						maxWidth = charWidth
					}
				})

				// Adjust cursor size based on text size
				gsap.set(cursorRef.current, {
					height: charHeight * 0.58,
					width: maxWidth * 0.7,
					y: charHeight * 0.17,
				})

				cursorTl.current.to(cursorRef.current, {
					delay,
					duration: typeSpeed * (text.length * 1.08),

					x: textWidth
						? textWidth + maxWidth * 0.25 + cursorLengthAdjust
						: undefined,
					ease: SteppedEase.config(text.length),
					onReverseComplete: () => {
						if (!shouldBlink) {
							gsap.to(cursorRef.current, {
								autoAlpha: 0,
								duration: 0,
							})
						}
					},
					onComplete: () => {
						if (!shouldBlink) {
							gsap.to(cursorRef.current, {
								autoAlpha: 0,
								duration: 0,
							})
						}
					},
				})
			},
		})

		gsap.set(splitText.chars, {
			autoAlpha: 0,
		})
		textTl.current.to(splitText.chars, {
			autoAlpha: 1,
			stagger: typeSpeed * 1.3,
			delay,
			duration: 0,
		})
	})

	useGSAP(() => {
		animateText()
	}, [])

	useGSAP(() => {
		if (shouldAnimate) {
			textTl.current.resume()
			cursorTl.current.resume()
		}
		if (reverse) {
			textTl.current.reversed(!shouldAnimate)
			cursorTl.current.reversed(!shouldAnimate)
		}

		// Handle cursor blinking

		if (shouldBlink || shouldAnimate) {
			gsap.to(cursorRef.current, {
				autoAlpha: 1,
				yoyo: true,
			})
		} else {
			gsap.to(cursorRef.current, {
				// autoAlpha: 0,
			})
		}
	}, [shouldAnimate, shouldBlink, reverse])

	const content =
		typeof children === 'string' ? (
			<p className={styles.text}>{children}</p>
		) : (
			children
		)

	return (
		<div ref={containerRef} className={cn(styles.container, className)}>
			<div ref={textRef} className={styles.text}>
				{content}
			</div>
			<div
				ref={cursorRef}
				className={cn(styles.cursor, cursorClassName)}></div>
		</div>
	)
}

export default TypeText
