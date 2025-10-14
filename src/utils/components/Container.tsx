import React, { FC, PropsWithChildren } from 'react'

import styles from './Container.module.scss'
import { cn } from '../react'

type MotionWithChildren = PropsWithChildren<ContainerProps>

interface ContainerProps {
	/** The Container Component comes wih default styling. Use this prop to override or add additional styling. */
	className?: string
}

/**
 * Automatically applies margins to the horizontal edge of the children.
 *
 * Style child elements to the edge of this container and it will keep content consistent across the site
 * @component
 * @example
 * <Conainer>
 *         <h1>Example Children</h1>
 *         <p>Example text</p>
 * </Conainer>
 */
const Container: FC<MotionWithChildren> = props => {
	const { children, className, ...rest } = props

	return (
		<div className={cn(styles.content, className)} {...rest}>
			{children}
		</div>
	)
}

export default Container
