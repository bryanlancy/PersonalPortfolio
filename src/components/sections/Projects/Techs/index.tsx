import { createRef, FC, RefObject, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(Flip)
gsap.registerPlugin(useGSAP)

import { techList } from '@/app/data'
import { Technology } from '@/app/data/technology-list'
import Tech from './Tech'

import styles from './Techs.module.scss'
import Details from './Details'

interface TechsProps {
	type: 'pro' | 'home'
}

const lists = {
	pro: [
		'nextjs',
		'typescriptJs',
		'git',
		'figma',
		'sass',
		'tailwindsBootstrap',
		'fontAwesome',
		'gsapMotion',
		'node',
		'docker',
		'graphql',
		'craft',
	],
	home: ['arduinoPi', 'cpp', 'cloudflare'],
}

const Techs: FC<TechsProps> = ({ type }) => {
	const [itemRefs] = useState<any>(
		Array(lists[type].length)
			.fill(null)
			.map(() => createRef())
	)
	const [selectedTech, setSelectedTech] = useState<Technology | null>(null)
	const [isZoomed, setIsZoomed] = useState(false)

	const detailRef = useRef(null)
	const flipState = useRef<Flip.FlipState | null>(null)
	const selectedRef = useRef<HTMLLIElement | null>(null)

	useGSAP(() => {
		gsap.set(detailRef.current, {
			position: 'absolute',
			width: '80%',
			height: '30%',
			minHeight: '200px',
			maxHeight: '400px',
			top: '50%',
			left: '50%',
			xPercent: -50,
			yPercent: -50,
			visibility: 'hidden',
		})
	}, [])

	function showDetails(item: RefObject<HTMLLIElement>, techInfo: Technology) {
		if (isZoomed) {
			return hideDetails()
		}
		selectedRef.current = item.current
		// F
		Flip.fit(detailRef.current, item.current, {
			// scale: true,
			absolute: true,
		})
		flipState.current = Flip.getState(detailRef.current, {
			props: 'rotateY,borderRadius',
		})

		// L
		gsap.set(detailRef.current, { clearProps: true })
		gsap.set(detailRef.current, {
			position: 'absolute',
			width: '80%',
			height: '30%',
			minHeight: 200,
			maxHeight: 400,
			top: '50%',
			left: '50%',
			borderRadius: '16px',

			xPercent: -50,
			yPercent: -50,
			boxShadow: '4px 4px 8px 6px #00000044',
		})
		gsap.set(selectedRef.current, { visibility: 'hidden' })

		// IP
		setSelectedTech(techInfo)
		Flip.from(flipState.current, {
			duration: 0.5,
			ease: 'power2.inOut',
			scale: true,
		})

		// End
		setIsZoomed(true)
	}
	function hideDetails() {
		flipState.current = Flip.getState(detailRef.current)
		Flip.fit(detailRef.current, selectedRef.current, {
			scale: true,
			absolute: true,
		})

		Flip.from(flipState.current, {
			scale: true,

			duration: 0.25,
		})
			.set(selectedRef.current, { visibility: 'visible' })
			.set(detailRef.current, {
				visibility: 'hidden',
				onComplete: () => {
					setIsZoomed(false)
					setSelectedTech(null)
				},
			})
		// End
	}

	return (
		<div className={styles.container}>
			<ul className={styles.list}>
				<Details
					techRef={detailRef}
					tech={selectedTech}
					hide={() => hideDetails()}
				/>
				{lists[type].map((tech, i) => {
					const techInfo = techList[tech]
					if (!techInfo) return null
					return (
						<Tech
							techRef={itemRefs[i]}
							key={`techlist-${tech}`}
							className={`${type}Tech`}
							onClick={() => {
								showDetails(itemRefs[i], techInfo)
							}}
							tech={techInfo}
							index={i}
						/>
					)
				})}
			</ul>
		</div>
	)
}

export default Techs
