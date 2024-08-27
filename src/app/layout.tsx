import type { Metadata } from 'next'
import { Bebas_Neue } from 'next/font/google'
import './globals.scss'

// Display/title fonts
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400' })

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
		<html lang='en'>
			<body className={bebasNeue.className}>{children}</body>
		</html>
	)
}
