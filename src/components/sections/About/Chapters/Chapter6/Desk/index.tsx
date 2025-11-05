import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChairOffice } from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'
import {
	faFaceParty,
	faFaceRelieved,
} from '@awesome.me/kit-ddd907bdb7/icons/duotone/regular'

import Box from './Box'

import styles from './Desk.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface BoxesProps {
	hobby: number
	pro: number
}
function Boxes({ hobby, pro }: BoxesProps) {
	const hobbyBoxes = []
	const proBoxes = []
	const boxOffset = 80
	for (let i = 0; i < hobby; i++) {
		hobbyBoxes.push(
			<Box
				key={`hob-box-${Math.random().toFixed(4)}`}
				start={200 + i * 400}
				type='hobby'
				endY={-i * boxOffset}
				size={120}
			/>
		)
	}
	for (let i = 0; i < pro; i++) {
		proBoxes.push(
			<Box
				key={`pro-box-${Math.random().toFixed(4)}`}
				start={2000 + i * 350}
				type='pro'
				endY={-i * boxOffset}
				size={120}
			/>
		)
	}

	return (
		<div className={styles.boxes}>
			{hobbyBoxes}
			{proBoxes}
		</div>
	)
}

const Desk = () => {
	useGSAP(() => {
		const deskTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter6',
				start: 'top top-=120px',
				end: '+=600px',
				scrub: true,
			},
		})
		deskTl.to(`.${styles.desk}`, {
			y: 0,
			autoAlpha: 1,
		})
		deskTl.to(`.${styles.chair}`, {
			y: -80,
			autoAlpha: 1,
			duration: 0.5,
		})
		deskTl.to(
			`.${styles.face}`,
			{
				y: -80,
				autoAlpha: 1,
				delay: 0.5,
			},
			'<'
		)
	}, [])

	return (
		<div className={styles.container}>
			<FontAwesomeIcon icon={faChairOffice} className={styles.chair} />
			<FontAwesomeIcon icon={faFaceRelieved} className={styles.face} />
			<FontAwesomeIcon icon={faFaceParty} className={styles.faceParty} />
			<Boxes hobby={6} pro={4} />
			<div className={styles.desk}>
				<div className={styles.top}>
					<div className={styles.drawerLeft}>
						<div className={styles.footLeft}></div>
						<div className={styles.footRight}></div>
					</div>
					<div className={styles.drawerRight}>
						<div className={styles.footLeft}></div>
						<div className={styles.footRight}></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Desk
