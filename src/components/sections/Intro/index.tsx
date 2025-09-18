'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import AnimatedText from './AnimatedText'
import AnimatedIcons from './AnimatedIcons'

import styles from './Intro.module.scss'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollToPlugin)

const Intro = () => {
	const sectionRef = useRef<HTMLDivElement>(null)

	const { contextSafe } = useGSAP({ scope: sectionRef })

	const handleAuto = contextSafe(() => {
		gsap.to(window, {
			duration: 90,
			scrollTo: { y: '#projects', autoKill: true },
		})
	})

	return (
		<section ref={sectionRef} className={styles.section}>
			<div className={styles.text}>
				<h1 className={styles.title}>Hello, I'm Bryan.</h1>

				<h2 className={styles.subtext}>
					And I'm a{' '}
					<AnimatedText
						text={'Test'}
						color={'#ff0000'}
						duration={5000}
					/>
				</h2>
			</div>
			<AnimatedIcons />

			<div className={styles.timelineButtons}>
				<button className={styles.auto} onClick={handleAuto}>
					Play Story
				</button>
				<Link href='#projects' className={styles.skip}>
					Skip
				</Link>

				<div className={styles.keepScrolling}>
					<p>or</p>
					<b>Keep scrolling to go at your own pace</b>
				</div>
			</div>
		</section>
	)
}

export default Intro
