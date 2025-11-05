import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'

import { Contact } from '../../../app/data/contact-list'
import CopyButton from './CopyButton'

import styles from './ContactCard.module.scss'

import { cn } from '@/utils/react'

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

type ContactCardProps = {
	contactMethod: Contact
	copy?: boolean
	className?: string
}

export default function ContactCard({
	contactMethod,
	className,
	copy = false,
}: ContactCardProps) {
	const { name, color, icon, link, linkText } = contactMethod

	return (
		<a
			className={cn(styles.card, className)}
			style={{ background: createBackground(color) }}
			href={name === 'Email' ? 'mailto:' + link : link}
			target='_blank'>
			<div className={styles.name}>
				<h1>{name}</h1>
				<div className={styles.linkText}>
					<div className={styles.mainText}>
						<p>{linkText}</p>
						<FontAwesomeIcon icon={faArrowRight} />
					</div>

					{copy && <CopyButton textToCopy={link} />}
				</div>
			</div>

			<div className={styles.iconMain}>{icon}</div>
		</a>
	)
}
