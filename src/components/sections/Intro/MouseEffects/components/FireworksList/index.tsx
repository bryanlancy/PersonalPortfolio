import React from 'react'

import Firework from '../Firework'

import styles from './FireworksList.module.scss'

/**
 * Props interface for FireworksList component
 */
export interface FireworksListProps {
	/** Array of active fireworks to render */
	fireworks: Array<{
		id: string
		x: number
		y: number
	}>
	/** Callback function to remove a completed firework */
	onRemoveFirework: (fireworkId: string) => void
	/** Optional className to apply to the fireworks container */
	className?: string
}

/**
 * FireworksList component that renders all active fireworks
 */
function FireworksList({
	fireworks,
	onRemoveFirework,
	className,
}: FireworksListProps) {
	if (fireworks.length === 0) return null

	return (
		<g className={className}>
			{fireworks.map(firework => (
				<g
					key={firework.id}
					transform={`translate(${firework.x}, ${firework.y})`}
					className={styles.firework}>
					<Firework
						x={0}
						y={0}
						onComplete={() => onRemoveFirework(firework.id)}
					/>
				</g>
			))}
		</g>
	)
}

export default FireworksList
