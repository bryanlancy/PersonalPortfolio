import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Network.module.scss'
import {
	faComputerClassic,
	faDatabase,
	faSatellite,
	faSatelliteDish,
	faServer,
	faTabletScreenButton,
} from '@awesome.me/kit-ddd907bdb7/icons/duotone/regular'
import { cn } from '@/utils/react'

const Network = () => {
	return (
		<div className={styles.container}>
			<div>
				<div className={cn(styles.node, styles.database)}>
					<FontAwesomeIcon
						className={styles.icon}
						icon={faDatabase}
					/>
				</div>
				<div className={cn(styles.node, styles.server)}>
					<FontAwesomeIcon className={styles.icon} icon={faServer} />
				</div>
				<div className={cn(styles.node, styles.computer)}>
					<FontAwesomeIcon
						className={styles.icon}
						icon={faComputerClassic}
					/>
				</div>
				<div className={cn(styles.node, styles.tablet)}>
					<FontAwesomeIcon
						className={styles.icon}
						icon={faTabletScreenButton}
					/>
				</div>
				<div className={cn(styles.node, styles.satellite)}>
					<FontAwesomeIcon
						className={styles.icon}
						icon={faSatellite}
					/>
				</div>
				<div className={cn(styles.node, styles.satDish)}>
					<FontAwesomeIcon
						className={styles.icon}
						icon={faSatelliteDish}
					/>
				</div>
			</div>
		</div>
	)
}

export default Network
