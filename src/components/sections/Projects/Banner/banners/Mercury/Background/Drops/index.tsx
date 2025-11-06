import { ReactNode, useEffect, useRef } from 'react'
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
	const lastIsActiveRef = useRef<boolean | null>(null)
	const rafIdRef = useRef<number | null>(null)

	useGSAP(() => {
		gsap.timeline({
			scrollTrigger: {
				trigger: `.mercury`,
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
				onUpdate: self => {
					// Only update state if isActive actually changed
					if (self.isActive !== lastIsActiveRef.current) {
						lastIsActiveRef.current = self.isActive

						// Throttle state updates using requestAnimationFrame
						if (rafIdRef.current !== null) {
							cancelAnimationFrame(rafIdRef.current)
						}

						rafIdRef.current = requestAnimationFrame(() => {
							makeDrops[1](self.isActive)
							rafIdRef.current = null
						})
					}
				},
			},
		})
	})

	const deleteDrop = (idToDelete: string) => {
		const filteredDrops = dropsState[2].current.filter(
			drop => drop.id !== idToDelete
		)
		dropsState[1](filteredDrops)

		// Add a new drop if we're below the target and makeDrops is active
		if (filteredDrops.length < drops && makeDrops[2].current) {
			setTimeout(() => {
				const currDrops = dropsState[2].current.length
				if (currDrops < drops && makeDrops[2].current) {
					const tempState = [...dropsState[2].current]
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
			}, randomInteger(500, 1500))
		}
	}

	// Cleanup requestAnimationFrame on unmount
	useEffect(() => {
		return () => {
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current)
			}
		}
	}, [])

	useEffect(() => {
		if (!makeDrops[2].current) return

		const intervalId = setInterval(() => {
			const currDrops = dropsState[2].current.length
			// Only add drops if we need more and makeDrops is still true
			if (currDrops < drops && makeDrops[2].current) {
				const tempState = [...dropsState[2].current]
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
		}, randomInteger(500, 2000)) // Check every 0.5-2 seconds

		return () => clearInterval(intervalId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [makeDrops[0], drops])

	return (
		<div className={styles.drops}>
			{dropsState[0].map(drop => drop.drop)}
		</div>
	)
}
