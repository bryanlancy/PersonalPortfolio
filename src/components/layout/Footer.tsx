import React, { FC } from 'react'

import styles from './Footer.module.scss'

type FooterProps = {}

const Footer: FC<FooterProps> = ({}) => {
	return (
		<footer className={styles.footer}>
			<div className={styles.text}>
				<b>Designed and coded by</b>
				<div className={styles.name}>
					<span>B</span>
					<span>r</span>
					<span>y</span>
					<span>a</span>
					<span>n</span>
					<span> </span>
					<span>B</span>
					<span>u</span>
					<span>r</span>
					<span>n</span>
					<span>s</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
