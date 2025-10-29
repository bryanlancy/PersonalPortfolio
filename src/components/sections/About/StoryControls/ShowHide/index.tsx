'use client'

import { useRef } from 'react'
import { Bebas_Neue } from 'next/font/google'

import { cn } from '@/utils/react'

import styles from './ShowHide.module.scss'

const bebasNeue = Bebas_Neue({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-bebas',
})

interface ShowHideProps {
	isCollapsed: boolean
	onToggle: () => void
	className?: string
}

const ShowHide = ({ isCollapsed, onToggle, className }: ShowHideProps) => {
	const buttonRef = useRef<HTMLButtonElement>(null)

	return (
		<button
			ref={buttonRef}
			className={cn(
				styles.showHideButton,
				bebasNeue.className,
				className
			)}
			onClick={onToggle}
			aria-label={isCollapsed ? 'Expand controls' : 'Collapse controls'}>
			<span className={styles.buttonText}>
				{isCollapsed ? 'Show' : 'Hide'}
			</span>
			<span className={styles.arrow}>{isCollapsed ? '←' : '→'}</span>
		</button>
	)
}

export default ShowHide
