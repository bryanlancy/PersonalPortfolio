import { FC, ReactNode, useEffect } from 'react'
import useState from 'react-usestateref'

import { randomInteger } from '@/utils/general'

import styles from './Drops.module.scss'
import Drop from './Drop'

interface DropsProps {
	/** Max number of drops */
	drops: number
}
type DropsState = {
	/** Drop JSX Element */
	drop: ReactNode
	id: string
}[]

// TODO Add logic to ensure variety in position and icons

const Drops: FC<DropsProps> = ({ drops }) => {
	const dropsState = useState<DropsState>([])

	const deleteDrop = (idToDelete: string) => {
		const filteredDrops = dropsState[2].current.filter(
			drop => drop.id !== idToDelete
		)
		dropsState[1](filteredDrops)
	}

	useEffect(() => {
		const currDrops = dropsState[0].length
		if (currDrops < drops) {
			const tempState = [...dropsState[0]]
			const newId: DropsState[number]['id'] = (
				currDrops -
				1 +
				Math.random()
			).toString()
			tempState.push({
				id: newId,
				drop: (
					<Drop
						key={newId}
						id={newId}
						droptions={{
							'--size': randomInteger(60, 120) + 'px',
							'--left': randomInteger(-1, 90) + '%',
							zIndex: Math.random() > 0.1 ? 4 : 1,
						}}
						deleteDrop={deleteDrop}
					/>
				),
			})

			dropsState[1](tempState)
		}
	}, [dropsState[0]])

	return (
		<div className={styles.drops}>
			{dropsState[0].map(drop => drop.drop)}
		</div>
	)
}

export default Drops
