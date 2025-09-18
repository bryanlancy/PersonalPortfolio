import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBarcode,
	faBoxTaped,
} from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'
import { FC } from 'react'
import { Part, partsArr } from '@/context/spreadsheetContext'

import styles from './Conveyor.module.scss'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

interface BoxProps {
	part: Part
}
const Box: FC<BoxProps> = ({ part }) => {
	const { partNumber } = part
	return (
		<div className={styles.boxContainer}>
			<FontAwesomeIcon icon={faBoxTaped} className={styles.box} />
			<FontAwesomeIcon icon={faBarcode} className={styles.barcode} />
			<p className={styles.partNumber}>{partNumber}</p>
		</div>
	)
}

const Conveyor = () => {
	useGSAP(() => {
		const conveyorTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.${styles.conveyor}`,
				start: 'bottom bottom+=100px',
				end: '+=3000px',
				scrub: true,
			},
		})
		conveyorTl.to(`.${styles.conveyor}`, {
			ease: 'none',
			x: -1500,
		})
	}, [])

	return (
		<div className={styles.conveyor}>
			<Box part={partsArr[0]} />
			<Box part={partsArr[3]} />
			<Box part={partsArr[10]} />
			<Box part={partsArr[6]} />
			<Box part={partsArr[4]} />
			<Box part={partsArr[2]} />
			<Box part={partsArr[7]} />
		</div>
	)
}

export default Conveyor
