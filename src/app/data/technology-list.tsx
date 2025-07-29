import { ReactElement } from 'react'

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

const categories = ['frontend', 'backend', 'styles', 'general'] as const
export interface Technology {
	/** Name of technology. */
	title: string
	/** Icon to use when showing the technology has been used. */
	icon: ReactElement | ReactElement[] | null
	/** Hex code used to style elements related to the technology. */
	color: string | string[]
	/** Category used to group techs used for similar things*/
	category: (typeof categories)[number] | (typeof categories)[number][]
	/** My story of my familiarity with the particular language */
	desctiption: string
}

// Technologies ===========
const nextjs: Technology = {
	title: 'Next.js',
	color: '#4304c9',
	// TODO Add Icon
	icon: null,
	category: 'frontend',
	desctiption: `My first experience with NextJS was working as a devloper at \
	Bowen Media. Many of the sites we worked on involved sites that had their own blogs \
	or stores where I server side rendering really shined.`,
}
const html: Technology = {
	title: 'HTML5',
	color: '#c96704',
	icon: <FontAwesomeIcon icon={faHtml5} />,
	category: 'frontend',
	desctiption: '',
}
const node: Technology = {
	title: 'Node',
	color: '#038717',
	icon: <FontAwesomeIcon icon={faNodeJs} />,
	category: 'general',
	desctiption: '',
}
const typescript: Technology = {
	title: 'Typescript',
	color: '#049fc9',
	// TODO Add Icon
	icon: null,
	category: 'general',
	desctiption: '',
}
const jsdocs: Technology = {
	title: 'JS Docs',
	color: '#049fc9',
	// TODO Add Icon
	icon: null,
	category: 'general',
	desctiption: '',
}

// Styling
const css: Technology = {
	title: 'CSS3',
	color: '#0450c9',
	icon: <FontAwesomeIcon icon={faCss3} />,
	category: 'styles',
	desctiption: '',
}
const sass: Technology = {
	title: 'Scss',
	color: '#c904c0',
	icon: <FontAwesomeIcon icon={faSass} />,
	category: 'styles',
	desctiption: '',
}
const tailwinds: Technology = {
	title: 'Tailwinds',
	color: '#0492c9',
	// TODO Add Icon
	icon: null,
	category: 'styles',
	desctiption: '',
}
const gsap: Technology = {
	title: 'GSAP',
	color: '#47ec61',
	// TODO Add Icon
	icon: null,
	category: 'styles',
	desctiption: '',
}
const motion: Technology = {
	title: 'Motion',
	color: '#f6eb2a',
	// TODO Add Icon
	icon: null,
	category: 'styles',
	desctiption: '',
}

// Version Control
const git: Technology = {
	title: 'Git/GitHub',
	color: ['#c95604', '#5a027a'],
	icon: [
		<FontAwesomeIcon icon={faGit} />,
		<FontAwesomeIcon icon={faGithub} />,
	],
	category: 'general',
	desctiption: '',
}

// Hobby Skills
const arduinoPi: Technology = {
	title: 'Arduino/Raspberry Pi',
	color: ['#02687a', '#bf064a'],
	icon: <FontAwesomeIcon icon={faRaspberryPi} />,
	category: 'general',
	desctiption: '',
}
const cpp: Technology = {
	title: 'C++',
	color: '#01548f',
	// TODO Add Icon
	icon: null,
	category: 'backend',
	desctiption: '',
}
const docker: Technology = {
	title: 'Docker',
	color: '#0458d6',
	icon: <FontAwesomeIcon icon={faDocker} />,
	category: 'general',
	desctiption: '',
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
	gsap,
	motion,
	node,
	arduinoPi,
	cpp,
	docker,
}

export default technologyList
