import { Intro, About, Projects, Contact } from '@/components/sections'
import { cn } from '@/utils/react'
import ClientLoader from '@/components/ClientLoader'

import Footer from '@/components/layout/Footer'

import styles from './page.module.scss'

export default function Home() {
	return (
		<ClientLoader>
			<main className={cn(styles.main, styles.page)}>
				<Intro />
				<About />
				<Projects max={10} />
				<Contact />
			</main>
			<Footer />
		</ClientLoader>
	)
}
