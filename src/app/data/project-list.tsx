import Image from 'next/image'
import { Technology } from './technology-list'

type NextImage = typeof Image
interface ProjectImage extends NextImage {
	/** Should the image be omitted from the thumbnail preview. Defaults to `false`. */
	ignoreThumbmail?: boolean
}

type company = 'bowen' | 'monster' | 'rd' | 'personal'

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
	description: (string | string[])[]
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
	description: [
		[
			'Monster was a company built on great communication. With that came a lot of, well, communicating.',
			'There were very large numbers of phone calls, texts, and emails and Mercury was the solution to connecting all of that disparate info.',
		],
		'It could parse spreadsheets and connect that info to templated emails and messages making it very versatile.',
		[
			'Mercury handled many types of message updates like delivered and read status.',
			'This provided valueable information to the marketing team who could then make informed decisions, such as the best time to send an email to maximize the open rate.',
		],
		'Mercury would also build a contact profile using message metadata that could combine different types of messages into a single thread, providing a centralized location for communications with a customer.',
	],
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
	description: [
		'You may recall from my previous project Monster does a lot of communicating.',
		'A lot of that is over phone calls and Monster takes pride in their quality (check out their mission statement, they genuinely embrace it).',
		'Every day hours of calls were manually audited to ensure quality and high standards were always followed.',
		"Otto's job was to automate this process. Utilizing Puppeteer and a service that analyzed conversations with AI it eliminated the need for manual auditing.",
		'To keep long term costs low while accounting for growth, Otto ran on custom hardware I built myself and utilized VMs to make scaling easy.',
	],
	images: [],
	technologies: [],
}
const twoBeeks: Project = {
	name: '2Beeks',
	article: false,
	link: undefined,
	priority: 7,
	company: 'rd',
	description: [
		'2Beeks is a family-owned and operated bee farm local to southern NJ.',
	],
	images: [],
	technologies: [],
}
const lab: Project = {
	name: 'Home Lab',
	article: false,
	link: undefined,
	priority: 0,
	company: 'personal',
	// TODO Add info
	description: [
		'My passion for technology started with fiddling around with all types of electronics to see how things operated.',
		'As my skills in web development grew, so did my needs for a deeper understanding of networking worked.',
		'Things like self-hosting (safely), hardware  specifications and installation, and making and connecting my own smart devices around the house are all fascinating to me.',
		'Setting up my own home lab seemed like the best way to tinker with more advanced networking concepts.',
		'I bought all the tools and supplies to hardwire my house for 10g speeds and got to work.',
		'I connected everything with a small server rack and setup a firewall with pfSense on dedicated hardware for more advnaced config options.',
		'(Had to design a custom exhaust solution to keep things cool in this tiny closet)',
	],
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
	description: [
		"As soon as I learned about the CAN Bus inside of a car I knew that I'd be playing around with it.",
		'I figured if I could get my own code running on hardawre that directly interacted with my car, the next limitation was just my imagination.',
		'Much like the home lab, my Car Computer was largely born out of a curiosity to learn more, but some one of a kind electronics was a nice perk too.',
		'The initial proof of concept utilized an Arduino to interface with the OBDII port and handle message encoding, and a Raspberry Pi connected to a touchscreen with an Electon app.',
		'To keep up the speeds of the CAN Bus and work on learning MISRA compliance I am rebuilding the project from the ground up in C++',
	],
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
	twoBeeks,
	otto,
	lab,
	carputer,
}

export default projectList
