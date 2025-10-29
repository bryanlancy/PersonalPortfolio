import { ReactNode, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useState from 'react-usestateref'

import { randomInteger } from '@/utils/general'
import Drop from './Drop'

import styles from './Drops.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

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

export default function Drops({ drops }: DropsProps) {
	const dropsState = useState<DropsState>([])
	const makeDrops = useState(false)

	useGSAP(() => {
		gsap.timeline({
			scrollTrigger: {
				trigger: `.mercury`,
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
				onUpdate: self => {
					if (self.isActive !== makeDrops[2].current)
						makeDrops[1](self.isActive)
				},
			},
		})
	})
	const deleteDrop = (idToDelete: string) => {
		const filteredDrops = dropsState[2].current.filter(
			drop => drop.id !== idToDelete
		)
		dropsState[1](filteredDrops)
	}

	useEffect(() => {
		const currDrops = dropsState[0].length
		if (currDrops < drops && makeDrops[0]) {
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
	}, [dropsState[0], makeDrops[0]])

	return (
		<div className={styles.drops}>
			{dropsState[0].map(drop => drop.drop)}
		</div>
	)
}
