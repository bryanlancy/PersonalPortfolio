import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChairOffice } from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'
import {
	faFaceParty,
	faFaceRelieved,
} from '@awesome.me/kit-ddd907bdb7/icons/duotone/regular'

import styles from './Desk.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

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
