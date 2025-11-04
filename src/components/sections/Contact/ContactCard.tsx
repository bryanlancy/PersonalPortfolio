import { useState, useRef, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'
import { faClipboard } from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { Contact } from '../../../app/data/contact-list'

import styles from './ContactCard.module.scss'

import { cn } from '@/utils/react'

gsap.registerPlugin(useGSAP)

type PopupState = {
	id: string
	isSuccess: boolean
}

export const createBackground: (color: Contact['color']) => string = color => {
	let background: string = ''
	switch (typeof color) {
		case 'string':
			background = color
			break
		case 'object':
			const step = 100 / color.length
			const gradientColors = color
				.map((c, i) => {
					const unit = '%'
					if (color[i + 1]) {
						return `${c} ${step * (i + 1)}${unit}, ${
							color[i + 1]
						} ${step * (i + 1) + 0.01}${unit}`
					} else {
						return `${c} ${step * (i + 1)}${unit}`
					}
				})
				.join(', ')
			background = `linear-gradient(45deg, ${gradientColors})`
			break
	}
	return background
}

/**
 * Tracks whether to simulate success or failure in dev environment
 * Alternates between true (success) and false (failure) for testing
 */
let devSuccessToggle = true

/**
 * Copies text to clipboard and triggers success/failure callbacks
 * @param e - Mouse event
 * @param text - Text to copy
 * @param onSuccess - Callback function to trigger on successful copy
 * @param onFailure - Callback function to trigger on failed copy
 */
const copyLink: (
	e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	text: string,
	onSuccess: () => void,
	onFailure: () => void
) => Promise<void> = async (e, text, onSuccess, onFailure) => {
	e.preventDefault()
	e.stopPropagation()

	const isDev = process.env.NODE_ENV === 'development'

	// In dev environment, alternate between success and failure for testing
	if (isDev) {
		if (devSuccessToggle) {
			devSuccessToggle = false
			onSuccess()
		} else {
			devSuccessToggle = true
			console.log(
				'Copy failed: Simulated failure for testing (dev environment)'
			)
			onFailure()
		}
		return
	}

	try {
		await navigator.clipboard.writeText(text)
		onSuccess()
	} catch (error) {
		console.error('Failed to copy text to clipboard:', error)
		onFailure()
	}
}

type ContactCardProps = {
	contactMethod: Contact
	copy?: boolean
	className?: string
}
export default function ContactCard({
	contactMethod,
	className,
	copy = false,
}: ContactCardProps) {
	const { name, color, icon, link, linkText } = contactMethod
	const [popups, setPopups] = useState<PopupState[]>([])
	const popupRefs = useRef<Map<string, HTMLDivElement>>(new Map())
	const containerRef = useRef<HTMLDivElement>(null)
	const previousPopupsLength = useRef(0)
	const timelinesRef = useRef<Map<string, gsap.core.Timeline>>(new Map())

	/**
	 * Sets a ref for a popup element
	 */
	const setPopupRef = useCallback(
		(id: string, element: HTMLDivElement | null) => {
			if (element) {
				popupRefs.current.set(id, element)
				// Ensure initial positioning is set immediately
				gsap.set(element, {
					xPercent: -50,
					yPercent: -50,
					transformOrigin: '50% 50%',
				})
			} else {
				popupRefs.current.delete(id)
				// Clean up any running timelines
				const timeline = timelinesRef.current.get(id)
				if (timeline) {
					timeline.kill()
					timelinesRef.current.delete(id)
				}
			}
		},
		[]
	)

	/**
	 * Animates existing popups upward when a new one is added
	 * Only animates popups that need to move (not the newest one)
	 */
	const animateExistingPopupsUp = useCallback(
		(newPopupIndex: number) => {
			requestAnimationFrame(() => {
				// Get the height of a popup (assume all are same height)
				const firstPopup = popupRefs.current.values().next().value
				if (!firstPopup) return

				const popupHeight = firstPopup.offsetHeight + 8 // height + margin

				// Only animate existing popups (all except the newest)
				popups.forEach((popup, index) => {
					if (index === newPopupIndex) return // Skip the new popup

					const popupElement = popupRefs.current.get(popup.id)
					if (popupElement) {
						// Calculate position: newest popup at bottom (y: 0), older ones stack above
						// Newest = index (popups.length - 1) at y: 0
						// Older popups have negative y values
						const targetY = -(
							(popups.length - 1 - index) *
							popupHeight
						)

						gsap.to(popupElement, {
							y: targetY,
							duration: 0.3,
							ease: 'power2.out',
						})
					}
				})
			})
		},
		[popups]
	)

	/**
	 * Animates popups when they are added
	 */
	useGSAP(
		() => {
			if (popups.length === 0) {
				previousPopupsLength.current = 0
				return
			}

			const isNewPopup = popups.length > previousPopupsLength.current

			// Only animate if a new popup was added
			if (!isNewPopup) {
				previousPopupsLength.current = popups.length
				return
			}

			previousPopupsLength.current = popups.length

			// Animate the latest popup in
			const latestPopup = popups[popups.length - 1]

			// Wait for DOM to be ready
			requestAnimationFrame(() => {
				const popupElement = popupRefs.current.get(latestPopup.id)

				if (!popupElement) {
					// If element isn't ready, remove from state to prevent orphaned popup
					console.warn('Popup element not found, removing from state')
					setPopups(prev => prev.filter(p => p.id !== latestPopup.id))
					return
				}

				const isSuccess = latestPopup.isSuccess
				const popupIndex = popups.length - 1

				// Calculate popup height
				const firstPopup = Array.from(popupRefs.current.values())[0]
				const popupHeight = firstPopup
					? firstPopup.offsetHeight + 8
					: 60
				// Newest popup (highest index) should be at bottom (y: 0)
				// Older popups stack above with negative y values
				const targetY = -(
					(popups.length - 1 - popupIndex) *
					popupHeight
				)

				// Set initial transform for centering and position
				gsap.set(popupElement, {
					xPercent: -50,
					yPercent: -50,
					transformOrigin: '50% 50%',
					autoAlpha: 0,
					scale: 0.5,
					y: 20,
				})

				// Animate existing popups up (only if there are existing ones)
				if (popups.length > 1) {
					animateExistingPopupsUp(popupIndex)
				}

				// Animate new popup in to its position
				const tl = gsap.timeline({
					onComplete: () => {
						// After fade-in completes, set up fade-out
						const fadeOutTl = gsap.timeline({
							onComplete: () => {
								// Remove popup from state after fade-out completes
								setPopups(prev =>
									prev.filter(p => p.id !== latestPopup.id)
								)
								timelinesRef.current.delete(latestPopup.id)
							},
						})

						timelinesRef.current.set(latestPopup.id, fadeOutTl)

						fadeOutTl.to(
							popupElement,
							{
								autoAlpha: 0,
								scale: 0.8,
								duration: 0.2,
								ease: 'power2.in',
							},
							'+=1' // Wait 1 second before fading out
						)
					},
				})

				timelinesRef.current.set(latestPopup.id, tl)

				tl.to(popupElement, {
					autoAlpha: 1,
					scale: 1,
					y: targetY,
					duration: 0.3,
					ease: isSuccess ? 'back.out(1.7)' : 'power2.out',
				})
			})
		},
		{ scope: containerRef, dependencies: [popups, animateExistingPopupsUp] }
	)

	/**
	 * Cleanup: Remove any popups that aren't in the state array
	 */
	useGSAP(
		() => {
			// Clean up any popup refs that are no longer in state
			const validIds = new Set(popups.map(p => p.id))
			popupRefs.current.forEach((_, id) => {
				if (!validIds.has(id)) {
					// Kill any running timelines
					const timeline = timelinesRef.current.get(id)
					if (timeline) {
						timeline.kill()
						timelinesRef.current.delete(id)
					}
					// Remove from refs
					popupRefs.current.delete(id)
				}
			})
		},
		{ scope: containerRef, dependencies: [popups] }
	)

	/**
	 * Handles successful copy operation
	 */
	const handleCopySuccess = useCallback(() => {
		const newPopup: PopupState = {
			id: `popup-${Date.now()}-${Math.random()}`,
			isSuccess: true,
		}
		setPopups(prev => [...prev, newPopup])
	}, [])

	/**
	 * Handles failed copy operation
	 */
	const handleCopyFailure = useCallback(() => {
		const newPopup: PopupState = {
			id: `popup-${Date.now()}-${Math.random()}`,
			isSuccess: false,
		}
		setPopups(prev => [...prev, newPopup])
	}, [])

	return (
		<a
			className={cn(styles.card, className)}
			style={{ background: createBackground(color) }}
			href={name === 'Email' ? 'mailto:' + link : link}
			target='_blank'>
			<div className={styles.name}>
				<h1>{name}</h1>
				<div className={styles.linkText}>
					<div className={styles.mainText}>
						<p>{linkText}</p>
						<FontAwesomeIcon icon={faArrowRight} />
					</div>

					{copy && (
						<div
							className={styles.copy}
							onClick={e =>
								copyLink(
									e,
									link,
									handleCopySuccess,
									handleCopyFailure
								)
							}>
							<p>Copy address to clipboard</p>
							<FontAwesomeIcon icon={faClipboard} />
						</div>
					)}
				</div>
			</div>

			<div className={styles.iconMain}>{icon}</div>

			<div ref={containerRef} className={styles.popupContainer}>
				{popups.map(popup => (
					<div
						key={popup.id}
						ref={el => setPopupRef(popup.id, el)}
						className={cn(
							styles.popup,
							[popup.isSuccess, styles.popupSuccess],
							[!popup.isSuccess, styles.popupFailed]
						)}>
						{popup.isSuccess ? 'Copied!' : 'Failed to copy'}
					</div>
				))}
			</div>
		</a>
	)
}
