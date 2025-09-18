import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'

import styles from './Chapter6.module.scss'
gsap.registerPlugin(ScrollTrigger)

/*
	Animation timeline

	Animation:
	Resource(youtube,etc) icons

	Transition:

*/

const Chapter6 = () => {
	const title = 'Going Pro'
	const text = `After a couple of years of learning and building personal \
				projects, I landed my first full-time dev job in 2021. I've \
				been building software professionally ever since, while continuing \
				to work on passion projects at home.`
	return (
		<div className={cn('chapter6', styles.chapter6)}>
			<h1 className={cn('c6-title', styles.title)}>{title}</h1>
			<p>{text}</p>
		</div>
	)
}

export default Chapter6
