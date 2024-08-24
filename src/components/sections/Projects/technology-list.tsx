import { ReactElement } from 'react'
import Image from 'next/image'

export interface Technology {
	/** Name of technology. */
	name: string
	/** Icon to use when showing the technology has been used. */
	icon: ReactElement
	/** Hex code used to style elements related to the technology. */
	color: string | string[]
	/** Description of experience with technology and favorite features. */
	description: string
}

// Technologies ===========
const nextjs: Technology = {
	name: 'Next.js',
	color: '#4304c9',
	// TODO Add Icon & description
	icon: <Image src={''} alt='' />,
	description: '',
}
const html: Technology = {
	name: 'HTML5',
	color: '#c96704',
	// TODO Add Icon & description
	icon: <Image src={''} alt='' />,
	description: '',
}
const node: Technology = {
	name: 'Node',
	color: '#038717',
	// TODO Add Icon & description
	icon: <Image src={''} alt='' />,
	description: '',
}
const typescript: Technology = {
	name: 'Typescript',
	color: '#049fc9',
	// TODO Add Icon & description
	icon: <Image src={''} alt='' />,
	description: '',
}
// Styling
const css: Technology = {
	name: 'CSS3',
	color: '#0450c9',
	// TODO Add Icon & description
	icon: <Image src={''} alt='' />,
	description: '',
}
const sass: Technology = {
	name: 'Scss',
	color: '#c904c0',
	// TODO Add Icon & description
	icon: <Image src={''} alt='' />,
	description: '',
}
const tailwinds: Technology = {
	name: 'Tailwinds',
	color: '#0492c9',
	// TODO Add Icon & description
	icon: <Image src={''} alt='' />,
	description: '',
}
// Version Control
const git: Technology = {
	name: 'Git/GitHub',
	color: ['#c95604', '#5a027a'],
	// TODO Add Icon & description
	icon: <Image src={''} alt='' />,
	description: '',
}
const arduinoPi: Technology = {
	name: 'Arduino/Raspberry Pi',
	color: ['#02687a', '#bf064a'],
	// TODO Add Icon & description
	icon: <Image src={''} alt='' />,
	description: '',
}
// ========================

/**
 * Object containing all technologies I'm familiar with.
 */
const technologyList: { [technologyName: string]: Technology } = {
	nextjs,
	sass,
	css,
	html,
	typescript,
	git,
	tailwinds,
	node,
	arduinoPi,
}

export default technologyList
