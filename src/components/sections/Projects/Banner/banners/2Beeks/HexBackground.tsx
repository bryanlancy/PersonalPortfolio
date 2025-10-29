import { cn } from '@/utils/react'

import styles from './HexBackground.module.scss'

const HexBackground = () => {
	return (
		<div className={styles.hexContainer}>
			<div className={cn(styles.hexagon, styles.hex2)}>
				<label className={styles.ref}>2</label>
			</div>

			<div className={cn(styles.hexagon, styles.hex3)}>
				<label className={styles.ref}>3</label>
			</div>

			<div className={cn(styles.hexagon, styles.hex4)}>
				<label className={styles.ref}>4</label>
			</div>
			<div className={cn(styles.hexagon, styles.hex5)}>
				<label className={styles.ref}>5</label>
			</div>
			<div className={cn(styles.hexagon, styles.hex6)}>
				<label className={styles.ref}>6</label>
			</div>
			<div className={cn(styles.hexagon, styles.hex7)}>
				<label className={styles.ref}>7</label>
			</div>
			<div className={cn(styles.hexagon, styles.hex8)}>
				<label className={styles.ref}>8</label>
			</div>
			<div className={cn(styles.hexagon, styles.hex9)}>
				<label className={styles.ref}>9</label>
			</div>
			<div className={cn(styles.hexagon, styles.hex10)}>
				<label className={styles.ref}>10</label>
			</div>
			<div className={cn(styles.hexagon, styles.hex11)}>
				<label className={styles.ref}>11</label>
			</div>
		</div>
	)
}

export default HexBackground
