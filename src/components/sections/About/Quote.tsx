'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faQuoteLeft,
	faQuoteRight,
} from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'

import styles from './Quote.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

interface QuoteProps {
	quote: string
	author: string
}

export default function Quote({ quote, author }: QuoteProps) {
	useGSAP(() => {
		const quoteTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.${styles.quoteContainer}`,
				start: 'top center+=300px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		SplitText.create(`.${styles.quoteText}`, {
			type: 'words',
			onSplit: ({ words }) => {
				quoteTl.to(words, {
					autoAlpha: 1,
					y: 0,
					duration: 0.25,
					stagger: 0.1,
				})
				quoteTl.to(`.${styles.author}`, {
					autoAlpha: 1,
					duration: 0.75,
				})
				quoteTl.to(`.${styles.closeQuote}`, {
					autoAlpha: 1,
					duration: 2,
					delay: 0.5,
				})
				quoteTl.to(
					`.${styles.openQuote}`,
					{
						autoAlpha: 1,
						duration: 2,
					},
					'<'
				)
				quoteTl.to(
					`.${styles.me}`,
					{
						autoAlpha: 1,
						duration: 2,
					},
					'<'
				)
			},
		})
	})

	return (
		<div className={styles.quoteContainer}>
			<div className={styles.openQuote}>
				<FontAwesomeIcon icon={faQuoteLeft} />
			</div>
			<figure className={styles.quote}>
				<p className={styles.quoteText}>"{quote}"</p>
				<figcaption className={styles.author}>- {author}</figcaption>
			</figure>
			<div className={styles.closeQuote}>
				<FontAwesomeIcon icon={faQuoteRight} />
			</div>
			<h2 className={styles.me}>- Bryan Burns</h2>
		</div>
	)
}
