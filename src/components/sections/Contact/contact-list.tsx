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
	icon: <Image src={''} alt='' />,
}
const github: Contact = {
	name: 'Github',
	link: 'https://github.com/bryanlancy',
}
const linkedin: Contact = {
	name: 'LinkedIn',
	link: 'https://www.linkedin.com/in/bryan-burns-b45006116/',
}
const email: Contact = {
	name: 'Email',
	link: 'mailto:bryanburns93@gmail.com',
}
const resume: Contact = {
	name: 'Resume',
	link: '',
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
