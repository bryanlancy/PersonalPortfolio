import { CSSProperties, FC } from 'react'
import { motion } from 'motion/react'
import {
	faMessageSmile,
	faPhoneArrowDownLeft,
	faPhoneArrowUpRight,
	faCommentSms,
	faEnvelope,
	faAt,
} from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'

import { randomInteger } from '@/utils/general'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Drops.module.scss'

interface Droptions extends CSSProperties {
	/** Size of the raindrop */
	'--size': string
	/** Horizonal position of raindrop */
	'--left': string
}

interface DropProps {
	id: string
	droptions: Droptions
	deleteDrop: Function
}

const Drop: FC<DropProps> = ({ id, droptions, deleteDrop }) => {
	const icons = [
		faMessageSmile,
		faPhoneArrowDownLeft,
		faPhoneArrowUpRight,
		faCommentSms,
		faEnvelope,
		faAt,
	]

	return (
		<motion.div
			className={styles.drop}
			style={{ ...droptions }}
			transition={{
				type: 'keyframes',
				duration: randomInteger(8, 14),
				times: [0, 0.25, 0.6, 0.7, 1],
			}}
			animate={{
				bottom: ['100%', '90%', '0%', '-4%', '-10%'],
				opacity: [1, 1, 1, 0, 0],
			}}
			exit={{ bottom: '-20%' }}
			onAnimationComplete={() => deleteDrop(id)}>
			<FontAwesomeIcon
				className={styles.icon}
				icon={icons[randomInteger(0, icons.length - 1)]}
			/>
		</motion.div>
	)
}

export default Drop
