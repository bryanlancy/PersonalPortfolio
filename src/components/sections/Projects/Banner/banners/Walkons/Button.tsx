import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'

import styles from './Button.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Button() {
	useGSAP(() => {
		const buttonTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.walkons',
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		buttonTl.to(`.${styles.button}`, {
			autoAlpha: 1,
			x: 0,
			ease: 'elastic.out',
			duration: 1,
		})
	})
	return (
		<a
			className={styles.button}
			href='https://walk-ons.com/'
			target='_blank'>
			<p>Check it out!</p>
			<div className={styles.iconContainer}>
				<FontAwesomeIcon
					className={styles.icon}
					icon={faChevronRight}
				/>
			</div>
		</a>
	)
}
