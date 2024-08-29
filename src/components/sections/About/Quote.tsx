'use client'

import React, { FC } from 'react'
import { AnimationProps, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faQuoteLeft,
	faQuoteRight,
} from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'

import styles from './Quote.module.scss'

interface QuoteProps {
	quote: string
	author: string
}

// Animation Properties
const init: AnimationProps['initial'] = {
	opacity: 0,
}
const final: AnimationProps['initial'] = {
	opacity: 1,
}
const outerTrans: AnimationProps['transition'] = {
	delay: 4,
	duration: 1.5,
	ease: 'easeIn',
}
const innerTrans: AnimationProps['transition'] = {
	delay: 1,
	duration: 1.5,
}

const Quote: FC<QuoteProps> = ({ quote, author }) => {
	return (
		<div className={styles.quoteContainer}>
			<motion.div
				className={styles.openQuote}
				initial={init}
				whileInView={final}
				transition={outerTrans}
				viewport={{ once: true }}>
				<FontAwesomeIcon icon={faQuoteLeft} />
			</motion.div>
			<motion.figure
				className={styles.quote}
				initial={init}
				whileInView={final}
				transition={innerTrans}
				viewport={{ once: true }}>
				<q>{quote}</q>
				<figcaption className={styles.author}>- {author}</figcaption>
			</motion.figure>
			<motion.div
				initial={init}
				whileInView={final}
				transition={outerTrans}
				viewport={{ once: true }}>
				<FontAwesomeIcon icon={faQuoteRight} />
			</motion.div>
			<motion.h2
				initial={init}
				whileInView={final}
				transition={outerTrans}
				viewport={{ once: true }}>
				- Bryan Burns
			</motion.h2>
		</div>
	)
}

export default Quote
