import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBarcode,
	faBoxTaped,
} from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'
import {
	faPlus,
	fa1,
	faMinus,
} from '@awesome.me/kit-ddd907bdb7/icons/duotone/regular'
import { FC, useRef } from 'react'
import { Part, useSpreadsheetContext } from '@/context/spreadsheetContext'

import styles from './Conveyor.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface BoxProps {
	part: Part
	index: number
}
const Box: FC<BoxProps> = ({ part, index }) => {
	const boxRef = useRef<HTMLDivElement>(null)
	const { scannerXState, inventoryState } = useSpreadsheetContext()
	const scanned = useRef<boolean>(false)

	const boxId = `conveyor-box-${index}`

	const { contextSafe } = useGSAP({
		// scope: boxRef,
		// dependencies: [],
	})

	const scan = contextSafe(() => {
		const scanTl = gsap.timeline()
		scanTl.to(`#scannerBeam`, {
			duration: 0.2,
			autoAlpha: 1,
		})
		scanTl.to('#scannerBeam', {
			duration: 0.2,
			autoAlpha: 0,
		})
	})
	const addOne = contextSafe(() => {
		const newInventory = { ...inventoryState[2].current }
		if (!newInventory) return
		const { partNumber: num } = part
		newInventory[num].quantity = newInventory[num].quantity + 1
		inventoryState[1](newInventory)

		const addTl = gsap.timeline()
		addTl.to(`#plus-${boxId}`, {
			duration: 0.1,
			autoAlpha: 1,
		})
		addTl.to(`#plus-${boxId}`, {
			y: -40,
			autoAlpha: 0,
		})
		addTl.to(`#plus-${boxId}`, {
			duration: 0.1,
			y: 0,
		})
	})
	const subOne = contextSafe(() => {
		const newInventory = { ...inventoryState[2].current }
		if (!newInventory) return
		const { partNumber: num } = part
		newInventory[num].quantity = newInventory[num].quantity - 1
		inventoryState[1](newInventory)

		const subTl = gsap.timeline()
		subTl.to(`#minus-${boxId}`, {
			duration: 0.1,
			autoAlpha: 1,
		})
		subTl.to(`#minus-${boxId}`, {
			y: -40,
			autoAlpha: 0,
		})
		subTl.to(`#minus-${boxId}`, {
			duration: 0.1,
			y: 0,
		})
	})

	useGSAP(() => {
		const mm = gsap.matchMedia()

		// Mobile: use 100 increment
		mm.add('(max-width: 599px)', () => {
			const conveyorTl = gsap.timeline({
				scrollTrigger: {
					trigger: `.${styles.conveyor}`,
					start: `bottom bottom-=${index * 200}`,
					end: `+=${window.innerWidth / 0.5}px`,
					scrub: true,
					onUpdate: () => {
						const rect = boxRef.current?.getBoundingClientRect()
						if (!rect || !scannerXState[2].current) return
						const midPoint = (rect.left + rect.right) * 0.48

						if (!scanned.current) {
							// Check for scan
							if (midPoint < scannerXState[2].current) {
								scan()
								addOne()
								scanned.current = true
							}
						} else {
							// Check for unscan
							if (midPoint > scannerXState[2].current) {
								subOne()
								scanned.current = false
							}
						}
					},
				},
			})
			conveyorTl.to(`#${boxId}`, {
				autoAlpha: 1,
				duration: 0.5,
			})
			conveyorTl.to(
				`#${boxId}`,
				{
					ease: 'none',
					duration: 5,
					x: () => {
						return -window.innerWidth - 100
					},
				},
				'<'
			)
			conveyorTl.to(
				`#${boxId}`,
				{
					autoAlpha: 0,
				},
				'>-.5'
			)
		})

		// Tablet and larger: use 200 increment
		mm.add('(min-width: 600px)', () => {
			const conveyorTl = gsap.timeline({
				scrollTrigger: {
					trigger: `.${styles.conveyor}`,
					start: `bottom bottom-=${index * 200}`,
					end: `+=${window.innerWidth / 1.01}px`,
					scrub: true,
					onUpdate: () => {
						const rect = boxRef.current?.getBoundingClientRect()
						if (!rect || !scannerXState[2].current) return
						const midPoint = (rect.left + rect.right) * 0.48

						if (!scanned.current) {
							// Check for scan
							if (midPoint < scannerXState[2].current) {
								scan()
								addOne()
								scanned.current = true
							}
						} else {
							// Check for unscan
							if (midPoint > scannerXState[2].current) {
								subOne()
								scanned.current = false
							}
						}
					},
				},
			})
			conveyorTl.to(`#${boxId}`, {
				autoAlpha: 1,
				duration: 0.5,
			})
			conveyorTl.to(
				`#${boxId}`,
				{
					ease: 'none',
					duration: 5,
					x: () => {
						return -window.innerWidth - 100
					},
				},
				'<'
			)
			conveyorTl.to(
				`#${boxId}`,
				{
					autoAlpha: 0,
				},
				'>-.5'
			)
		})
	}, [])

	if (!part) return null
	return (
		<div id={boxId} ref={boxRef} className={styles.boxContainer}>
			<div className={styles.scanCount}>
				<div id={`plus-${boxId}`} className={styles.plus}>
					<FontAwesomeIcon icon={faPlus} />
					<FontAwesomeIcon icon={fa1} />
				</div>
				<div id={`minus-${boxId}`} className={styles.minus}>
					<FontAwesomeIcon icon={faMinus} />
					<FontAwesomeIcon icon={fa1} />
				</div>
			</div>
			<FontAwesomeIcon icon={faBoxTaped} className={styles.box} />
			<FontAwesomeIcon icon={faBarcode} className={styles.barcode} />
			<p className={styles.partNumber}>{part.partNumber}</p>
		</div>
	)
}

const Conveyor = () => {
	const { partsArr } = useSpreadsheetContext()
	const conveyorRef = useRef<HTMLDivElement>(null)

	const partIds = [0, 8, 3, 5, 1, 10, 6, 4, 2, 7, 8, 2, 6, 3, 5, 0]

	useGSAP(() => {
		const updateConveyorPosition = () => {
			// Find scanner by looking within the spreadsheet element
			const spreadsheetElement = document.querySelector('.spreadsheet')
			const conveyorElement = conveyorRef.current
			if (!spreadsheetElement || !conveyorElement) return

			// Find the scanner beam element (where boxes should overlap)
			const scannerBeamElement = document.getElementById('scannerBeam')
			if (!scannerBeamElement) return

			// Find a box to get its height
			const firstBox = conveyorElement.querySelector(
				`.${styles.boxContainer}`
			)
			if (!firstBox) return

			const conveyorContainerRect =
				conveyorElement.parentElement?.getBoundingClientRect()
			if (!conveyorContainerRect) return

			// Get positions relative to viewport
			const beamRect = scannerBeamElement.getBoundingClientRect()
			const boxRect = firstBox.getBoundingClientRect()

			// Calculate box height
			const boxHeight = boxRect.height

			// Calculate position relative to the conveyor's container
			// Position conveyor so its bottom aligns with the bottom of the scanner beam
			const beamBottom = beamRect.bottom
			const containerTop = conveyorContainerRect.top
			const topPosition = beamBottom - containerTop - boxHeight

			// Position conveyor and set its height to match the boxes
			gsap.set(conveyorElement, {
				top: topPosition,
				bottom: 'auto',
				height: boxHeight,
			})
		}

		// Update position on scroll
		const updateTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: 'top bottom',
				end: 'bottom top',
				onUpdate: updateConveyorPosition,
				onEnter: updateConveyorPosition,
				onEnterBack: updateConveyorPosition,
				onLeave: updateConveyorPosition,
				onLeaveBack: updateConveyorPosition,
			},
		})

		// Also update on resize
		window.addEventListener('resize', updateConveyorPosition)

		// Initial update with a small delay to ensure elements are rendered
		setTimeout(updateConveyorPosition, 100)

		return () => {
			window.removeEventListener('resize', updateConveyorPosition)
		}
	}, [])

	if (!partsArr) return null
	return (
		<div ref={conveyorRef} className={styles.conveyor}>
			{partIds.map((id, i) => {
				const [num, name, cost] = partsArr[id]
				return (
					<Box
						key={`conveyor-item-${i}`}
						index={i + 1}
						part={{
							partId: id,
							partName: name,
							partNumber: num,
							unitPrice: cost,
						}}
					/>
				)
			})}
		</div>
	)
}

export default Conveyor
