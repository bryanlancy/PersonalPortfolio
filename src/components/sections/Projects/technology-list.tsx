export interface Technology {
	/** Name of technology. */
	name: string
	/** Icon to use when showing the technology has been used. */
	icon: typeof Image
	/** Hex code used to style elements related to the technology. */
	color: string
	/** Description of experience with technology and favorite features. */
	description: string
}

// Technologies ===========
const nextjs: Technology = {}
const sass: Technology = {}
const css: Technology = {}
const html: Technology = {}
const javascript: Technology = {}
const git: Technology = {}
const tailwinds: Technology = {}
const node: Technology = {}
const arduinoPi: Technology = {}
// ========================

/**
 * Object containing all technologies I'm familiar with.
 */
const technologyList: { [technologyName: string]: Technology } = {
	nextjs,
	sass,
	css,
	html,
	javascript,
	git,
	tailwinds,
	node,
	arduinoPi,
}

export default technologyList
