import React, { FC, PropsWithChildren } from 'react'

import styles from './Container.module.scss'

interface ContainerProps {}

/**
 * Automatically applies margins to the horizontal edge of the children.
 *
 * Style child elements to the edge of this container and it will keep content consistent across the site
 * @component
 * @example
 * <Conainer>
 *     <div>
 *         <h1>Example Children</h1>
 *         <p>Example text</p>
 *     </div>
 * </Conainer>
 */
const Container: FC<PropsWithChildren<ContainerProps>> = ({ children }) => {
	return <div className={styles.content}>{children}</div>
}

export default Container
