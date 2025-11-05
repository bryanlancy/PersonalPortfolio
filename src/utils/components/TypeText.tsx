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

	/** Adjust length of cursor (px) animation by given amount to fix timing errors */
	cursorLengthAdjust?: number //! Can this be fixed?
	cursorClassName?: string
	shouldBlink?: boolean
}

// TODO Fix cursor type distance..build timeline from char width?
// TODO Cursor doesn't appear when timeline is reversed if its been cleared

const TypeText: FC<TypeTextProps> = ({
	children,
	className,
	cursorLengthAdjust = 0,

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
		// Cursor blinking animation
		gsap.to(`.${styles.cursor}`, {
			opacity: 1,
			repeat: -1,
			yoyo: true,
			ease: SteppedEase.config(1),
		})

		// Split text into lines and characters
		const splitText = SplitText.create(textRef.current, {
			type: 'lines, chars',
			deepSlice: true,
			autoSplit: true,
		})

		const lines = splitText.lines || []
		const chars = splitText.chars || []
		const isMultiline = lines.length > 1

		if (!chars.length || !cursorRef.current) return

		// Calculate character dimensions
		let maxWidth = 0
		const charHeight = chars[0]?.getBoundingClientRect().height || 0
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
		})

		// Set all characters to invisible initially
		gsap.set(chars, {
			autoAlpha: 0,
		})

		if (isMultiline) {
			// Handle multiline text
			let totalDuration = delay
			const containerRect = textRef.current?.getBoundingClientRect()

			// Set initial cursor position and visibility
			if (lines.length > 0 && chars.length > 0) {
				const firstLineChars: Element[] = []
				const firstLine = lines[0]

				chars.forEach(char => {
					if (firstLine.contains(char)) {
						firstLineChars.push(char)
					}
				})

				if (firstLineChars.length > 0) {
					const firstCharRect =
						firstLineChars[0].getBoundingClientRect()
					const initialX =
						firstCharRect.left - (containerRect?.left || 0)
					const initialY =
						firstCharRect.top - (containerRect?.top || 0)

					gsap.set(cursorRef.current, {
						x: initialX,
						y: initialY + charHeight * 0.17,
						autoAlpha: 1,
					})
				}
			}

			lines.forEach((line, lineIndex) => {
				// Get all characters in this line
				// SplitText organizes chars within line elements in the DOM
				const lineChars: Element[] = []
				const lineRect = line.getBoundingClientRect()

				chars.forEach(char => {
					// Check if char is a descendant of this line element
					if (line.contains(char)) {
						lineChars.push(char)
					}
				})

				// Fallback: if DOM hierarchy check doesn't work, use position-based matching
				if (lineChars.length === 0) {
					chars.forEach(char => {
						const charRect = char.getBoundingClientRect()
						// Check if char is within the vertical bounds of this line
						if (
							charRect.top >= lineRect.top - 1 &&
							charRect.top <= lineRect.bottom + 1
						) {
							lineChars.push(char)
						}
					})
				}

				if (lineChars.length === 0) return

				// Calculate line start position relative to container
				const lineStartX =
					lineChars[0].getBoundingClientRect().left -
					(containerRect?.left || 0)
				const lineStartY =
					lineChars[0].getBoundingClientRect().top -
					(containerRect?.top || 0)

				// Position cursor at start of line (if not first line, this moves it)
				if (lineIndex > 0 || delay > 0) {
					cursorTl.current.set(
						cursorRef.current,
						{
							x: lineStartX,
							y: lineStartY + charHeight * 0.17,
							autoAlpha: 1,
						},
						totalDuration
					)
				}

				// Animate characters appearing for this line
				lineChars.forEach((char, charOffset) => {
					const charStartTime =
						totalDuration + charOffset * typeSpeed * 1.3

					textTl.current.to(
						char,
						{
							autoAlpha: 1,
							duration: 0,
						},
						charStartTime
					)

					// Move cursor to position after this character
					const charRect = char.getBoundingClientRect()
					const charEndX =
						charRect.right -
						(containerRect?.left || 0) +
						maxWidth * 0.25 +
						cursorLengthAdjust

					cursorTl.current.to(
						cursorRef.current,
						{
							x: charEndX,
							duration: typeSpeed,
							ease: 'none',
						},
						charStartTime
					)
				})

				// Update total duration for next line
				totalDuration += lineChars.length * typeSpeed * 1.3
			})

			// Handle cursor visibility on complete and reverse complete
			cursorTl.current.call(
				() => {
					if (!shouldBlink && cursorRef.current) {
						gsap.to(cursorRef.current, {
							autoAlpha: 0,
							duration: 0,
						})
					}
				},
				[],
				totalDuration
			)

			// Set up reverse complete handler on the timeline
			cursorTl.current.eventCallback('onReverseComplete', () => {
				if (!shouldBlink && cursorRef.current) {
					gsap.to(cursorRef.current, {
						autoAlpha: 0,
						duration: 0,
					})
				}
			})
		} else {
			// Handle single line text (original behavior)
			const textWidth = textRef.current?.getBoundingClientRect().width

			gsap.set(cursorRef.current, {
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

			textTl.current.to(chars, {
				autoAlpha: 1,
				stagger: typeSpeed * 1.3,
				delay,
				duration: 0,
			})
		}
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
