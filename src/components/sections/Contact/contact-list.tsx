import Image from 'next/image'
import { ReactElement } from 'react'

interface Contact {
	/** Name of contact method */
	name: string
	/** Link for redirecting to contact method */
	link: string
	/** Icon to be used */
	icon: ReactElement
	/** Hexcode to be used to style elements related to the contact method */
	color: string
}

// Contact Methods ========
const wellfound: Contact = {
	name: 'wellfound:',
	link: 'https://wellfound.com/u/bryan-burns-4',
	color: '#00ff00',
	// TODO Add Icon
	icon: <Image src={''} alt='' />,
}
const github: Contact = {
	name: 'Github',
	link: 'https://github.com/bryanlancy',
	color: '#cc8800',
	// TODO Add Icon
	icon: <Image src={''} alt='' />,
}
const linkedin: Contact = {
	name: 'LinkedIn',
	link: 'https://www.linkedin.com/in/bryan-burns-b45006116/',
	color: '#0457c4',
	// TODO Add Icon
	icon: <Image src={''} alt='' />,
}
const email: Contact = {
	name: 'Email',
	link: 'mailto:bryanburns93@gmail.com',
	color: '#c9c604',
	// TODO Add Icon
	icon: <Image src={''} alt='' />,
}
const resume: Contact = {
	name: 'Resume',
	link: '/Resume_Bryan_Burns.pdf',
	color: '#6304c9',
	// TODO Add Icon
	icon: <Image src={''} alt='' />,
}
// ========================

/**\
 * Object containing all ways of contacting me.
 */
const contactList: { [contactName: string]: Contact } = {
	wellfound,
	github,
	linkedin,
	email,
	resume,
}

export default contactList
