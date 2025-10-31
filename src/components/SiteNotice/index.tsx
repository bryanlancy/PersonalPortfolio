'use client'

import { useState, useEffect } from 'react'

import { cn } from '@/utils/react'
import { preventScroll, enableScroll } from '@/utils/general'

import styles from './SiteNotice.module.scss'

interface SiteNoticeProps {
	/** Optional className to override or extend styling */
	className?: string
	/** When true, always show regardless of environment. Defaults to false. */
	debug?: boolean
}

/**
 * A temporary popup notice to inform users about the site redesign status.
 * @component
 */
function SiteNotice(props: SiteNoticeProps) {
	const { className, debug = false } = props

	// Only show in production builds unless explicitly debugging
	if (!debug && process.env.NODE_ENV !== 'production') {
		return null
	}

	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		if (isVisible) {
			preventScroll()
		} else {
			enableScroll()
		}

		return () => {
			if (isVisible) {
				enableScroll()
			}
		}
	}, [isVisible])

	const handleClose = () => {
		setIsVisible(false)
	}

	if (!isVisible) {
		return null
	}

	return (
		<div className={cn(styles.overlay, className)}>
			<div className={styles.popup}>
				<button
					className={styles.closeButton}
					onClick={handleClose}
					aria-label='Close notice'>
					×
				</button>
				<div className={styles.content}>
					<p className={styles.embarrassingText}>
						Well, this is embarrassing 😅
					</p>
					<h2 className={styles.title}>Site Redesign in Progress</h2>
					<p className={styles.message}>
						Thank you for visiting! My portfolio has recently
						undergone a redesign, and while I'm working hard to
						polish everything, there are still some improvements in
						progress.
					</p>
					<p className={styles.browserNote}>
						The site is currently best viewed on a standard desktop
						browser. Please check back shortly for updates!
					</p>
					<div className={styles.focusList}>
						<h3 className={styles.focusTitle}>Current Task:</h3>
						<ul className={styles.bulletList}>
							<li>Add responsive styling</li>
							<li>Optimize performance for all devices</li>
						</ul>
					</div>
					<button
						className={styles.continueButton}
						onClick={handleClose}>
						Continue to Site
					</button>
				</div>
			</div>
		</div>
	)
}

export default SiteNotice
