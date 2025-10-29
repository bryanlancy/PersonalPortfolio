import { FC, useRef } from 'react'
import {
	FontAwesomeIcon,
	FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'
import {
	faAlien8bit,
	faBlockQuestion,
	faCameraRetro,
	faComputerClassic,
	faFluxCapacitor,
	faGameConsoleHandheld,
	faGamepad,
	faMp3Player,
	faTvRetro,
} from '@awesome.me/kit-ddd907bdb7/icons/duotone/regular'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { randomInteger } from '@/utils/general'
import { cn } from '@/utils/react'

import styles from './Background.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface Icon {
	icon: FontAwesomeIconProps['icon']
	className: string
}
const icons: Icon[] = [
	{ icon: faComputerClassic, className: styles.computer },
	{ icon: faGamepad, className: styles.gamepad },
	{ icon: faCameraRetro, className: styles.camera },
	{ icon: faTvRetro, className: styles.tv },
	{ icon: faMp3Player, className: styles.mp3 },
	{ icon: faFluxCapacitor, className: styles.flux },
	{ icon: faGameConsoleHandheld, className: styles.gameboy },
	{ icon: faAlien8bit, className: styles.alien },
	{ icon: faBlockQuestion, className: styles.block },
]

interface FallingIconProps {
	icon: FontAwesomeIconProps['icon']
	className: string
}
const FallingIcon: FC<FallingIconProps> = ({ icon, className }) => {
	const iconRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		gsap.set(iconRef.current, {
			top: `${randomInteger(0, 95)}%`,
			left: `${randomInteger(0, 100)}%`,
			fontSize: `${randomInteger(24, 48)}`,
			filter: `blur(${Math.random() * 2}px)`,
			autoAlpha: 1,
		})
		const distance = randomInteger(750, 1500)
		const iconTl = gsap.timeline({
			scrollTrigger: {
				trigger: iconRef.current,
				start: 'top bottom',
				end: `+=${distance * 2}px`,
				scrub: true,
			},
		})
		iconTl.to(iconRef.current, {
			rotate: randomInteger(720, 2400),
			y: distance,
			scale: randomInteger(0.25, 0.75),
			ease: 'none',
		})
	}, [])

	return (
		<div ref={iconRef} className={cn(styles.icon, className)}>
			<FontAwesomeIcon icon={icon} />
		</div>
	)
}

const Background = () => {
	return (
		<div className={styles.container}>
			{icons.map(({ icon, className }, i) => {
				return (
					<FallingIcon
						key={`chapter1-icon-${i}`}
						icon={icon}
						className={className}
					/>
				)
			})}
		</div>
	)
}

export default Background
