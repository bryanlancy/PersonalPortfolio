import type { Metadata } from 'next'
import { Bebas_Neue } from 'next/font/google'
import './globals.scss'

// Fix Font Awesome icons
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { LoadingProvider } from '@/context/loadingContext'
import { PostHogProvider } from './providers'

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
				<PostHogProvider>
					<LoadingProvider>{children}</LoadingProvider>
				</PostHogProvider>
			</body>
		</html>
	)
}
