import { FC, MouseEventHandler, PropsWithChildren } from 'react'
import styles from './HexButton.module.scss'

import Link from 'next/link'
import { cn } from '@/utils/react'

interface HexButtonProps extends PropsWithChildren {
	className?: string
	text?: string
	variant?: 'dark'
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined
	href?: string
	target?: string
}

const HexButton: FC<HexButtonProps> = ({
	text,
	className,
	variant = '',
	onClick,
	children,
	href,
	target,
}) => {
	const innerHtml = children || text

	if (href) {
		return (
			<Link
				target={target}
				href={href}
				className={cn(styles.button, styles[variant], className)}>
				{innerHtml}
			</Link>
		)
	}

	return (
		<button
			onClick={onClick}
			className={cn(styles.button, styles[variant], className)}>
			{innerHtml}
		</button>
	)
}

export default HexButton
