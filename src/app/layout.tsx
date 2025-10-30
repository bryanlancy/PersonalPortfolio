import type { Metadata } from 'next'
import { Bebas_Neue } from 'next/font/google'
import './globals.scss'

// Fix Font Awesome icons
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { cn } from '@/utils/react'
import { LoadingProvider } from '@/context/loadingContext'
config.autoAddCss = false

// Display/title fonts
const bebasNeue = Bebas_Neue({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-bebas',
})

export const metadata: Metadata = {
	title: 'Bryan Burns | Software Engineer',
	description: 'My portfolio site!',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={bebasNeue.className}>
			<body>
				<LoadingProvider>{children}</LoadingProvider>
			</body>
		</html>
	)
}
