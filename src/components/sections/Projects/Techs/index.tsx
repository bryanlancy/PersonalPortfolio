import { FC } from 'react'

import styles from './Techs.module.scss'

interface TechsProps {
	type: 'pro' | 'home'
}

const Techs: FC<TechsProps> = () => {
	return <div>Techs</div>
}

export default Techs
