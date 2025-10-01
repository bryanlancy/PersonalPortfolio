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
		const conveyorTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.${styles.conveyor}`,
				start: `bottom bottom-=${index * 200 - 600}`,
				// start: 'bottom bottom',
				end: `+=${window.innerWidth / 2}px`,
				scrub: true,
				onUpdate: () => {
					// console.log('test')
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
			ease: 'none',
			x: () => {
				return -window.innerWidth - 100
			},
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

	const partIds = [0, 8, 3, 5, 1, 10, 6, 4, 2, 7, 8, 2, 6, 3, 5, 0]

	if (!partsArr) return null
	return (
		<div className={styles.conveyor}>
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
