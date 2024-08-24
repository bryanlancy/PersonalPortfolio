import { Intro, About, Projects, Contact } from '@/components/sections'

import styles from './page.module.scss'

export default function Home() {
	return (
		<main className={styles.main}>
			<Intro />
			<About />
			<Projects max={3} />
			<Contact />
		</main>
	)
}
