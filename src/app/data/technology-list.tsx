import { ReactElement } from 'react'
import Image from 'next/image'
import {
	faCss3,
	faDocker,
	faGit,
	faGithub,
	faHtml5,
	faNodeJs,
	faRaspberryPi,
	faSass,
} from '@awesome.me/kit-ddd907bdb7/icons/classic/brands'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface Technology {
	/** Name of technology. */
	name: string
	/** Icon to use when showing the technology has been used. */
	icon: ReactElement | ReactElement[]
	/** Hex code used to style elements related to the technology. */
	color: string | string[]
	/**  Category used to group techs used for similar things*/
	category: 'frontend' | 'backend' | 'styles' | 'general'
}

// Technologies ===========
const nextjs: Technology = {
	name: 'Next.js',
	color: '#4304c9',
	// TODO Add Icon
	icon: <Image src='' alt='' />,
	category: 'frontend',
}
const html: Technology = {
	name: 'HTML5',
	color: '#c96704',
	icon: <FontAwesomeIcon icon={faHtml5} />,
	category: 'frontend',
}
const node: Technology = {
	name: 'Node',
	color: '#038717',
	icon: <FontAwesomeIcon icon={faNodeJs} />,
	category: 'general',
}
const typescript: Technology = {
	name: 'Typescript',
	color: '#049fc9',
	// TODO Add Icon
	icon: <Image src='' alt='' />,
	category: 'general',
}
const jsdocs: Technology = {
	name: 'JS Docs',
	color: '#049fc9',
	// TODO Add Icon
	icon: <Image src='' alt='' />,
	category: 'general',
}

// Styling
const css: Technology = {
	name: 'CSS3',
	color: '#0450c9',
	icon: <FontAwesomeIcon icon={faCss3} />,
	category: 'styles',
}
const sass: Technology = {
	name: 'Scss',
	color: '#c904c0',
	icon: <FontAwesomeIcon icon={faSass} />,
	category: 'styles',
}
const tailwinds: Technology = {
	name: 'Tailwinds',
	color: '#0492c9',
	// TODO Add Icon
	icon: <Image src='' alt='' />,
	category: 'styles',
}

// Version Control
const git: Technology = {
	name: 'Git/GitHub',
	color: ['#c95604', '#5a027a'],
	icon: [
		<FontAwesomeIcon icon={faGit} />,
		<FontAwesomeIcon icon={faGithub} />,
	],
	category: 'general',
}

// Hobby Skills
const arduinoPi: Technology = {
	name: 'Arduino/Raspberry Pi',
	color: ['#02687a', '#bf064a'],
	icon: <FontAwesomeIcon icon={faRaspberryPi} />,
	category: 'general',
}
const cpp: Technology = {
	name: 'C++',
	color: '#01548f',
	// TODO Add Icon
	icon: <Image src='' alt='' />,
	category: 'backend',
}
const docker: Technology = {
	name: 'Docker',
	color: '#0458d6',
	icon: <FontAwesomeIcon icon={faDocker} />,
	category: 'general',
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
	jsdocs,
	git,
	tailwinds,
	node,
	arduinoPi,
	cpp,
	docker,
}

export default technologyList
