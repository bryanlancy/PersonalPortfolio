import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'

import { cn } from '@/utils/react'

import chapter5Styles from '../Chapter5.module.scss'

interface ProContainerProps {
	containerClassName: string
	icon: IconDefinition
	banIcon?: IconDefinition
	text: string
	textClassName?: string
}

const ProContainer = ({
	containerClassName,
	icon,
	banIcon,
	text,
	textClassName,
}: ProContainerProps) => {
	return (
		<div
			className={cn(
				chapter5Styles.proContainer,
				containerClassName
			)}>
			<div className={chapter5Styles.iconContainer}>
				{banIcon && (
					<FontAwesomeIcon
						icon={banIcon}
						className={chapter5Styles.ban}
					/>
				)}
				<FontAwesomeIcon
					icon={icon}
					className={chapter5Styles.icon}
				/>
			</div>
			<div className={chapter5Styles.text}>
				<FontAwesomeIcon
					icon={faCheck}
					className={chapter5Styles.check}
				/>
				<p className={textClassName}>{text}</p>
			</div>
		</div>
	)
}

export default ProContainer

