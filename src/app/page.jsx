import { Intro, About, Projects, Contact } from '@/components/sections'
import { cn } from '@/utils/react'

import styles from './page.module.scss'
import Footer from '@/components/layout/Footer'

export default function Home() {
	return (
		<>
			<main className={cn(styles.main, styles.page)}>
				<Intro />
				<About />
				<Projects max={10} />
				<Contact />
			</main>
			<Footer />
		</>
	)
}
