import { ReactElement } from 'react'

import {
	faCloudflare,
	faCss3,
	faDocker,
	faFigma,
	faFontAwesome,
	faGit,
	faGithub,
	faHtml5,
	faJs,
	faNodeJs,
	faRaspberryPi,
	faReact,
	faSass,
} from '@awesome.me/kit-ddd907bdb7/icons/classic/brands'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const categories = ['frontend', 'backend', 'styles', 'general'] as const
export interface Technology {
	/** Name used to lookup tech info */
	name: string
	/** Display name of technology. */
	title: string
	/** Icon to use when showing the technology has been used. */
	icon: ReactElement | (ReactElement | null)[] | null
	/** Hex code used to style elements related to the technology. */
	color: string | string[]
	/** Category used to group techs used for similar things*/
	category: (typeof categories)[number] | (typeof categories)[number][]
	/** My story of my familiarity with the particular language */
	description: (string | string[])[]
	/** Array of image urls for any examples */
	images?: string[]
}

// Technologies ===========
/**
 *
 * Object containing all technologies I'm familiar with.
 */
const technologyList: { [technologyName: string]: Technology } = {
	nextjs: {
		title: 'Next.js/React',
		name: 'nextjs',
		color: ['#4304c9', '#58c4dc'],
		// TODO Add Icon
		icon: [null, <FontAwesomeIcon icon={faReact} />],
		category: 'frontend',
		description: [
			`My first experience with NextJS was working as a devloper at \
	Bowen Media. Many of the sites we worked on involved sites that had their own blogs \
	or stores where I learned how server side rendering really shined.`,
		],
	},

	html: {
		title: 'HTML',
		name: 'html',
		color: '#c96704',
		icon: <FontAwesomeIcon icon={faHtml5} />,
		category: 'frontend',
		description: [
			"HTML was the first language I learned in the realm of web development. \
	I had been tinkering with Raspberry Pi's and Arduinos for a while at that point in my life, \
	but with smart home devices starting to become more popular I knew I had to get my hobby projects online. \
	I found a Udemy course from Rob Percival and haven't stopped since.",
		],
	},
	node: {
		title: 'Node',
		name: 'node',
		color: '#038717',
		icon: <FontAwesomeIcon icon={faNodeJs} />,
		category: 'general',
		description: [''],
	},

	typescriptJs: {
		title: 'Typescript/JS Docs',
		name: 'typescriptJs',
		color: ['#3178c6', '#049fc9'],
		// TODO Add Icon
		icon: [null, null],
		category: 'general',
		description: [''],
	},
	typescript: {
		title: 'Typescript',
		name: 'typescript',
		color: ['#3178c6'],
		// TODO Add Icon
		icon: null,
		category: 'general',
		description: [
			"I didn't start using Typescript until after I started my first full-time software position \
		at Monster Reservations Group.",
		],
	},
	javascript: {
		title: 'Javascript',
		name: 'javascript',
		color: '#f7df1e',
		// TODO Add Icon
		icon: <FontAwesomeIcon icon={faJs} />,
		category: 'general',
		description: [''],
	},
	jsdocs: {
		title: 'JS Docs',
		name: 'jsdocs',
		color: '#049fc9',
		// TODO Add Icon
		icon: null,
		category: 'general',
		description: [''],
	},
	graphql: {
		title: 'GraphQL',
		name: 'graphql',
		color: '#f6009b',
		icon: null,
		category: 'backend',
		description: [''],
	},
	craft: {
		title: 'CraftCMS',
		name: 'craft',
		color: '#e5422b',
		icon: null,
		category: 'backend',
		description: [''],
	},

	// Design
	figma: {
		title: 'Figma',
		name: 'figma',
		color: ['#ff3737', '#ff7237', '#874fff', '#00b6ff', '#24cb71'],
		icon: <FontAwesomeIcon icon={faFigma} />,
		category: 'styles',
		description: [''],
	},
	css: {
		title: 'CSS',
		name: 'css',
		color: '#0450c9',
		icon: <FontAwesomeIcon icon={faCss3} />,
		category: 'styles',
		description: [''],
	},
	sass: {
		title: 'SCSS',
		name: 'sass',
		color: ['#c904c0'],
		icon: <FontAwesomeIcon icon={faSass} />,
		category: 'styles',
		description: [''],
	},
	fontAwesome: {
		title: 'Font Awesome',
		name: 'fontAwesome',
		color: '#146ebe',
		icon: <FontAwesomeIcon icon={faFontAwesome} />,
		category: 'styles',
		description: [''],
	},
	tailwinds: {
		title: 'Tailwinds',
		name: 'tailwinds',
		color: '#00bcff',
		// TODO Add Icon
		icon: null,
		category: 'styles',
		description: [''],
	},
	bootstrap: {
		title: 'Bootstrap',
		name: 'bootstrap',
		color: '#5a437f',
		// TODO Add Icon
		icon: null,
		category: 'styles',
		description: [''],
	},
	tailwindsBootstrap: {
		title: 'Tailwinds/Bootstrap',
		name: 'tailwindsBootstrap',
		color: ['#00bcff', '#5a437f'],
		// TODO Add Icon
		icon: null,
		category: 'styles',
		description: [''],
	},
	gsapMotion: {
		title: 'GSAP/Motion',
		name: 'gsapMotion',
		color: ['#0ad644', '#f6eb2a'],
		// TODO Add Icon
		icon: [null, null],
		category: 'styles',
		description: [''],
	},
	gsap: {
		title: 'GSAP',
		name: 'gsap',
		color: '#0ad644',
		// TODO Add Icon
		icon: null,
		category: 'styles',
		description: [''],
	},
	motion: {
		title: 'Motion',
		name: 'motion',
		color: '#f6eb2a',
		// TODO Add Icon
		icon: null,
		category: 'styles',
		description: [''],
	},

	// Version Control
	git: {
		title: 'Git/GitHub',
		name: 'git',
		color: ['#c95604', '#5a027a'],
		icon: [
			<FontAwesomeIcon icon={faGit} />,
			<FontAwesomeIcon icon={faGithub} />,
		],
		category: 'general',
		description: [''],
	},

	// Hobby Skills
	arduinoPi: {
		title: 'Arduino/Raspberry Pi',
		name: 'arduinoPi',
		color: ['#02687a', '#bf064a'],
		icon: [null, <FontAwesomeIcon icon={faRaspberryPi} />],
		category: 'general',
		description: [''],
	},
	cpp: {
		title: 'C++',
		name: 'cpp',
		color: '#01548f',
		// TODO Add Icon
		icon: null,
		category: 'backend',
		description: [''],
	},
	docker: {
		title: 'Docker',
		name: 'docker',
		color: '#0458d6',
		icon: <FontAwesomeIcon icon={faDocker} />,
		category: 'general',
		description: [''],
	},
	cloudflare: {
		title: 'Cloudflare',
		name: 'cloudflare',
		color: '#f3811a',
		icon: <FontAwesomeIcon icon={faCloudflare} />,
		category: 'general',
		description: [''],
	},
} as const

// ========================
export default technologyList
