import Image from 'next/image'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import WalkOnsLogo from './Logo'

import styles from './Background.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)
export default function Background({}) {
	// const variants

	useGSAP(() => {
		const imageTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.walkons`,
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		imageTl.to(`.${styles.imageBackground}`, {
			autoAlpha: 1,
		})
		const overLayTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.walkons`,
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		overLayTl.to(`.${styles.overlay}`, {
			autoAlpha: 0.4,
		})
		const colorBackgroundTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.${styles.background}`,
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		colorBackgroundTl.to(`.${styles.colorBackground}`, {
			autoAlpha: 1,
		})
		const logoTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.walkons`,
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		logoTl.to(`.${styles.logo}`, {
			autoAlpha: 0.4,
		})
	})
	return (
		<>
			<div className={styles.imageBackground}>
				<div className={styles.overlay}></div>
				<Image
					src='/assets/walkons/walkons.jpg'
					alt='walkons restaurant'
					priority
					width={800}
					height={500}
					className={styles.image}
				/>
			</div>
			<div className={styles.colorBackground}></div>

			<WalkOnsLogo className={styles.logo} />
		</>
	)
}
