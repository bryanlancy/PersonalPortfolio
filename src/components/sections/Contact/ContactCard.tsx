'use client'

import React, { FC } from 'react'
import { Contact } from '../../../app/data/contact-list'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'
import { faClipboard } from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'
import { motion } from 'motion/react'

import styles from './ContactCard.module.scss'

export const createBackground: (color: Contact['color']) => string = color => {
	let background: string = ''
	switch (typeof color) {
		case 'string':
			background = color
			break
		case 'object':
			const step = 100 / color.length
			const gradientColors = color
				.map((c, i) => {
					const unit = '%'
					if (color[i + 1]) {
						return `${c} ${step * (i + 1)}${unit}, ${
							color[i + 1]
						} ${step * (i + 1) + 0.01}${unit}`
					} else {
						return `${c} ${step * (i + 1)}${unit}`
					}
				})
				.join(', ')
			background = `linear-gradient(45deg, ${gradientColors})`
			break
	}
	return background
}

const copyLink: (
	e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	text: string
) => void = (e, text) => {
	e.preventDefault()
	// TODO Add animation for successful/failed copy
	if (location.protocol !== 'https:') {
		console.error('Cannot copy to clipboard over insecure connection!')
		return
	}
	// Copy the text inside the text field
	navigator.clipboard.writeText(text)
}

type ContactCardProps = {
	contactMethod: Contact
	i: number
	copy?: boolean
}
const ContactCard: FC<ContactCardProps> = ({
	contactMethod,
	i,
	copy = false,
}) => {
	const { name, color, icon, link, linkText } = contactMethod

	return (
		<motion.a
			className={styles.card}
			style={{ background: createBackground(color) }}
			href={name === 'Email' ? 'mailto:' + link : link}
			target='_blank'
			initial={{ opacity: 0, transform: 'translateY(40px)' }}
			whileInView={{ opacity: 1, transform: 'translateY(0)' }}
			viewport={{ once: true }}
			transition={{ delay: i * 0.2, ease: 'easeIn' }}>
			<div className={styles.name}>
				<h1>{name}</h1>
				<div className={styles.linkText}>
					<div className={styles.mainText}>
						<p>{linkText}</p>
						<FontAwesomeIcon icon={faArrowRight} />
					</div>

					{copy && (
						<div
							className={styles.copy}
							onClick={e => copyLink(e, link)}>
							<p>Copy address to clipboard</p>
							<FontAwesomeIcon icon={faClipboard} />
						</div>
					)}
				</div>
			</div>

			<div className={styles.iconMain}>{icon}</div>
		</motion.a>
	)
}

export default ContactCard
