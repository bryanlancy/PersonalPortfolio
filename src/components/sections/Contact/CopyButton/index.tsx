import { useState, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'

import Popup from '../Popup'

import styles from './CopyButton.module.scss'

/**
 * Tracks whether to simulate success or failure in dev environment
 * Alternates between true (success) and false (failure) for testing
 */
let devSuccessToggle = true

type PopupState = {
	id: string
	type: 'success' | 'error'
	x: number // Relative to copy button
	y: number // Relative to copy button
}

interface CopyButtonProps {
	textToCopy: string
	className?: string
}

export default function CopyButton({ textToCopy }: CopyButtonProps) {
	const [popups, setPopups] = useState<PopupState[]>([])
	const buttonRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	/**
	 * Handles popup completion - removes it from state
	 */
	const handlePopupComplete = useCallback((popupId: string) => {
		setPopups(prev => prev.filter(p => p.id !== popupId))
	}, [])

	/**
	 * Copies text to clipboard and creates a popup at click location
	 */
	const copyToClipboard = useCallback(
		async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			e.preventDefault()
			e.stopPropagation()

			// Get click position relative to the copy button
			const buttonRect = e.currentTarget.getBoundingClientRect()
			const clickX = e.clientX - buttonRect.left
			const clickY = e.clientY - buttonRect.top

			// Calculate button position relative to the popup container
			// The popup container is offset by -200px left and -100px top
			// So we need to adjust coordinates to account for this offset
			let adjustedX = clickX
			let adjustedY = clickY

			if (buttonRef.current && containerRef.current) {
				const containerRect =
					containerRef.current.getBoundingClientRect()
				const buttonContainerRect =
					buttonRef.current.getBoundingClientRect()
				// Get button position relative to container
				const buttonLeft = buttonContainerRect.left - containerRect.left
				const buttonTop = buttonContainerRect.top - containerRect.top
				// Adjust for popup container's offset (-200px left, -100px top)
				// Also subtract 32px from y to position popup 32px above the click location
				adjustedX = clickX + buttonLeft + 200
				adjustedY = clickY + buttonTop + 100 - 72 // Subtract 32 to position 32px above click
			}

			const isDev = process.env.NODE_ENV === 'development'

			// In dev environment, alternate between success and failure for testing
			if (isDev) {
				if (devSuccessToggle) {
					devSuccessToggle = false
					// Success
					const newPopup: PopupState = {
						id: `popup-${Date.now()}-${Math.random()}`,
						type: 'success',
						x: adjustedX,
						y: adjustedY,
					}
					setPopups(prev => [...prev, newPopup])
				} else {
					devSuccessToggle = true
					console.log(
						'Copy failed: Simulated failure for testing (dev environment)'
					)
					// Failure
					const newPopup: PopupState = {
						id: `popup-${Date.now()}-${Math.random()}`,
						type: 'error',
						x: adjustedX,
						y: adjustedY,
					}
					setPopups(prev => [...prev, newPopup])
				}
				return
			}

			// Production: check for secure connection
			if (location.protocol !== 'https:') {
				console.log(
					`Copy failed: Insecure connection (${location.protocol}). Clipboard API requires HTTPS.`
				)
				const newPopup: PopupState = {
					id: `popup-${Date.now()}-${Math.random()}`,
					type: 'error',
					x: adjustedX,
					y: clickY,
				}
				setPopups(prev => [...prev, newPopup])
				return
			}

			try {
				await navigator.clipboard.writeText(textToCopy)
				// Success
				const newPopup: PopupState = {
					id: `popup-${Date.now()}-${Math.random()}`,
					type: 'success',
					x: adjustedX,
					y: clickY,
				}
				setPopups(prev => [...prev, newPopup])
			} catch (error) {
				console.log('Copy failed: Clipboard API error:', error)
				console.error('Failed to copy text to clipboard:', error)
				// Failure
				const newPopup: PopupState = {
					id: `popup-${Date.now()}-${Math.random()}`,
					type: 'error',
					x: adjustedX,
					y: clickY,
				}
				setPopups(prev => [...prev, newPopup])
			}
		},
		[textToCopy]
	)

	return (
		<div ref={containerRef} className={styles.copyButtonContainer}>
			<div
				ref={buttonRef}
				className={styles.copy}
				onClick={copyToClipboard}>
				<p>Copy address to clipboard</p>
				<FontAwesomeIcon icon={faClipboard} />
			</div>

			<div className={styles.popupContainer}>
				{popups.map(popup => (
					<Popup
						key={popup.id}
						text={
							popup.type === 'success'
								? 'Copied!'
								: 'Failed to copy'
						}
						type={popup.type}
						x={popup.x}
						y={popup.y}
						onComplete={() => handlePopupComplete(popup.id)}
					/>
				))}
			</div>
		</div>
	)
}
