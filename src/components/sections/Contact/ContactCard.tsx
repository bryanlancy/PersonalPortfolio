import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'
import { faClipboard } from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'

import { Contact } from '../../../app/data/contact-list'

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
	className?: string
}
export default function ContactCard({
	contactMethod,
	i,
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
		</a>
	)
}
