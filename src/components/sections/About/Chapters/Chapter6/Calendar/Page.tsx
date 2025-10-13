import { forwardRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'

import styles from './Calendar.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface PageProps {
	title: string
	className?: string
	last?: boolean
}

const Page = forwardRef<HTMLDivElement, PageProps>(
	({ title, className, last = true }, ref) => {
		useGSAP(() => {
			const pageTl = gsap.timeline({
				scrollTrigger: {
					trigger: `.${styles.pageContainer}`,
					start: 'top top',
					end: '+=400px',
					scrub: true,
				},
			})
			pageTl.to(`.${styles.pageContainer}`, {
				rotateY: '30deg',
			})
		}, [])

		return (
			<div
				className={cn(styles.pageContainer, className)}
				ref={ref}
				// @ts-expect-error
				orienation={'landscape'}>
				<div className={styles.page}>
					<div className={styles.header}>
						<h1>{title}</h1>
					</div>
					<div className={styles.grid}>
						<div className={styles.row}>
							<div className={styles.month}>
								<b>Jan</b>
							</div>
							<div className={styles.month}>
								<b>Feb</b>
							</div>
							<div className={styles.month}>
								<b>Mar</b>
							</div>
							<div className={styles.month}>
								<b>Apr</b>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.month}>
								<b>May</b>
							</div>
							<div className={styles.month}>
								<b>Jun</b>
							</div>
							<div className={styles.month}>
								<b>Jul</b>
							</div>
							<div className={styles.month}>
								<b>Aug</b>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.month}>
								<b>Sep</b>
							</div>
							<div className={styles.month}>
								<b>Oct</b>
							</div>
							<div className={styles.month}>
								<b>Nov</b>
							</div>
							<div className={styles.month}>
								<b>Dec</b>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.back}></div>
			</div>
		)
	}
)

export default Page
