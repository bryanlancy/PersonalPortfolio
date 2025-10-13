import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Page from './Page'

import styles from './Calendar.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Calendar = () => {
	const page1Ref = useRef(null)
	const page2Ref = useRef(null)
	const page3Ref = useRef(null)
	const page4Ref = useRef(null)
	const page5Ref = useRef(null)
	const page6Ref = useRef(null)
	const page7Ref = useRef(null)

	useGSAP(() => {
		const calendarTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter6',
				start: 'top top',
				end: '+=200px',

				toggleActions: 'play none resume reverse',
			},
		})
		calendarTl.to(`.${styles.calendar}`, {
			ease: 'elastic.out',
			duration: 0.75,
			x: 0,
		})
		const pageTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter6',
				start: 'top top-=200px',
				end: '+=2000px',
				scrub: true,
			},
		})
		pageTl.to(`.${styles.pageAnim}`, {
			rotateX: '91deg',

			duration: 2,
			stagger: -1.5,
		})
	}, [])

	return (
		<div className={styles.calendar}>
			<Page
				ref={page7Ref}
				title='2021'
				className={styles.pageFinal}
				last={true}
			/>
			<Page ref={page6Ref} title='2020' className={styles.pageAnim} />
			<Page ref={page5Ref} title='2019' className={styles.pageAnim} />
			<Page ref={page4Ref} title='2018' className={styles.pageAnim} />
			<Page ref={page3Ref} title='2017' className={styles.pageAnim} />
			<Page ref={page2Ref} title='2016' className={styles.pageAnim} />
			<Page ref={page1Ref} title='2015' className={styles.pageAnim} />
		</div>
	)
}

export default Calendar
