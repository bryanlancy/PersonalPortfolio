import { FC } from 'react'

import { Project } from '@/app/data/project-list'
import Drop from './Background/Drops/Drop'
import styles from './Bucket.module.scss'

interface BucketProps {
	/** Text to display inside of the bucket. Pass an array of strings to display multiple lines */
	text: Project['description'][number]
	/** The Bucket Component comes wih default styling. Use this prop to override or add additional styling. */
	className?: string
}

const Bucket: FC<BucketProps> = ({ text }) => {
	if (typeof text === 'undefined') return null

	const content = typeof text === 'string' ? [text] : text

	return (
		<div className={styles.bucket}>
			{content.map(line => (
				<p key={Math.random()} className={styles.line}>
					{line}
				</p>
			))}
			<div className={styles.background}></div>
		</div>
	)
}

export default Bucket
