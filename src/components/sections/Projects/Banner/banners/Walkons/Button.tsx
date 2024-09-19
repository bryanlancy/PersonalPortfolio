import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './WalkOns.module.scss'

interface ButtonProps {
	animProgress: number
}

const Button: FC<ButtonProps> = ({ animProgress }) => {
	const enter = 0.01
	const exit = 0.95
	return (
		<AnimatePresence>
			{animProgress >= enter && animProgress <= exit && (
				<motion.a
					key='button'
					initial={{ transform: 'translateX(-150%)' }}
					animate={{ transform: 'translateX(0%)' }}
					transition={{
						type: 'spring',
						stiffness: 120,
						delay: 0.2,
					}}
					exit={{ transform: 'translateX(-150%)' }}
					className={styles.button}
					href='https://walk-ons.com/'
					target='_blank'>
					<p>Check out the site!</p>
					<div className={styles.iconContainer}>
						<FontAwesomeIcon
							className={styles.icon}
							icon={faChevronRight}
						/>
					</div>
				</motion.a>
			)}
		</AnimatePresence>
	)
}

export default Button
