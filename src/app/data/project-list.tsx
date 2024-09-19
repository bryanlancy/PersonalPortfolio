import Image from 'next/image'
import { Technology } from './technology-list'

type NextImage = typeof Image
interface ProjectImage extends NextImage {
	/** Should the image be omitted from the thumbnail preview. Defaults to `false`. */
	ignoreThumbmail?: boolean
}

type company = 'bowen' | 'monster' | 'personal'

export interface Project {
	/** Name of the project. */
	name: string
	/** The technologies used in making the project. */
	technologies: Technology[]
	/** Array of `next/image`.
	 *
	 * Add `ignoreThumbnail={true}` to omit an image from the thumbnail preview. */
	images: ProjectImage[]
	/** Short description to use in previews */
	description: string[]
	/** Company project was made for */
	company: company
	/** Link to the project, if applicable. */
	link?: string
	/** Does the project have a related article page? Defaults to `false` */
	article?: boolean
	/** Priority when ordering projects in a list. Higher priorities come first. Projects with the same priority will be grouped properly but order is not guaranteed. */
	priority: number
}

// Projects ===============
const walkOns: Project = {
	name: "Walk On's",
	article: false,
	link: 'https://walk-ons.com/',
	priority: 10,
	company: 'bowen',
	// TODO Add info
	description: [
		"While working at Bowen Media one of the largest projects I took on was being the primary developer for the Walk-On's website redesign.",
		"Working with an awesome design team and support from the dev team guaranteed an amazing result. I'm proud to have worked on such a cool project!",
	],
	images: [],
	technologies: [],
}
const mercury: Project = {
	name: 'Mercury',
	article: false,
	link: undefined,
	priority: 9,
	company: 'monster',
	// TODO Add info
	description: [''],
	images: [],
	technologies: [],
}
const otto: Project = {
	name: 'Otto',
	article: false,
	link: undefined,
	priority: 8,
	company: 'monster',
	// TODO Add info
	description: [''],
	images: [],
	technologies: [],
}
const network: Project = {
	name: 'Home Network',
	article: false,
	link: undefined,
	priority: 0,
	company: 'personal',
	// TODO Add info
	description: [''],
	images: [],
	technologies: [],
}
const carputer: Project = {
	name: 'Car Computer',
	article: false,
	link: undefined,
	priority: 0,
	company: 'personal',
	// TODO Add info
	description: [''],
	images: [],
	technologies: [],
}

// ========================

/**
 * Object containing all notable projects
 */
const projectList: { [projectName: string]: Project } = {
	walkOns,
	mercury,
	otto,
	network,
	carputer,
}

export default projectList
