'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitText from 'gsap/SplitText'
import { Bebas_Neue } from 'next/font/google'

import { cn } from '@/utils/react'

import styles from './ShowHide.module.scss'
import { faArrowUp } from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

gsap.registerPlugin(useGSAP, SplitText)

const bebasNeue = Bebas_Neue({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-bebas',
})

interface ShowHideProps {
	isCollapsed: boolean
	onToggle: () => void
	className?: string
}

const ShowHide = ({ isCollapsed, onToggle, className }: ShowHideProps) => {
	const showHideTlRef = useRef<GSAPTimeline>(gsap.timeline({}))
	const showShowTlRef = useRef<GSAPTimeline>(gsap.timeline({}))
	const arrowTlRef = useRef<GSAPTimeline>(gsap.timeline({}))
	const buttonRef = useRef<HTMLButtonElement>(null)

	useGSAP(() => {
		arrowTlRef.current.to(`.${styles.arrow}`, {
			rotate: 180,
			duration: 0.3,
			ease: 'power2.inOut',
		})
		arrowTlRef.current.to(
			`.${styles.showHideButton}`,
			{
				backgroundColor: 'rgb(143, 47, 47)',
				duration: 0.3,
				ease: 'power2.inOut',
			},
			'<'
		)

		SplitText.create(`.${styles.show}`, {
			type: 'chars',
			autoSplit: true,
			mask: 'lines',
			onSplit: ({ chars }) => {
				showShowTlRef.current.to(chars, {
					y: 0,
					autoAlpha: 1,
					stagger: 0.1,
				})
			},
		})

		SplitText.create(`.${styles.hide}`, {
			type: 'chars',
			mask: 'lines',
			autoSplit: true,
			onSplit: ({ chars }) => {
				showHideTlRef.current.to(chars, {
					y: 0,
					autoAlpha: 1,
					stagger: -0.1,
				})
			},
		})
	}, [])

	useGSAP(() => {
		if (isCollapsed) {
			showShowTlRef.current.reversed(false)
			showHideTlRef.current.reversed(true)
			arrowTlRef.current.reversed(true)
		} else {
			showShowTlRef.current.reversed(true)
			showHideTlRef.current.reversed(false)
			arrowTlRef.current.reversed(false)
		}
	}, [isCollapsed])

	return (
		<button
			ref={buttonRef}
			className={cn(
				styles.showHideButton,
				bebasNeue.className,
				className
			)}
			onClick={onToggle}
			aria-label={isCollapsed ? 'Expand controls' : 'Collapse controls'}>
			<span className={cn(styles.buttonText, styles.show)}>Show</span>
			<span className={cn(styles.buttonText, styles.hide)}>Hide</span>
			<FontAwesomeIcon icon={faArrowUp} className={styles.arrow} />
		</button>
	)
}

export default ShowHide
